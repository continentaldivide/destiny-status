import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { get } from 'idb-keyval';
import LoadingScreen from '../_components/Loading/LoadingScreen';
import ErrorMessage from '../_components/ErrorMessage';
import { useManifestStatus } from '../_hooks/useManifestStatus';
import ManifestType from '../_interfaces/Manifest.interface';

const ManifestContext = createContext<ManifestType | undefined>(undefined);

export function ManifestContextProvider({ children }: { children: ReactNode }) {
  const manifestStatus = useManifestStatus();
  const [manifest, setManifest] = useState<ManifestType | undefined>();
  const [manifestIsReady, setManifestIsReady] = useState(false);
  const newestManifestInStorage = manifestStatus === 'manifestReady';
  const badApiResponse = manifestStatus === 'badApiResponse';

  const userMessages: {
    [key: string]: string;
  } = {
    checkingVersion: 'Checking for new Bungie data...',
    downloadingManifest: 'Downloading new manifest from Bungie...',
    manifestReady: 'Loading item definitions...',
    badApiResponse: 'Bad API response',
  };

  useEffect(() => {
    if (!newestManifestInStorage) return;
    (async () => {
      const manifest: ManifestType | undefined = await get('manifest');
      setManifest(manifest);
      setManifestIsReady(true);
    })();
  }, [newestManifestInStorage]);

  let pageContent: ReactNode;

  if (manifestIsReady) {
    pageContent = children;
  } else if (badApiResponse) {
    // placeholder for a more fleshed-out notification re: API issues
    pageContent = (
      // <LoadingScreen loadingMessage={userMessages[manifestStatus]} />
      <ErrorMessage />
    );
  } else {
    pageContent = (
      <LoadingScreen loadingMessage={userMessages[manifestStatus]} />
    );
  }

  return (
    <ManifestContext.Provider value={manifest}>
      {pageContent}
    </ManifestContext.Provider>
  );
}

export function useManifestContext() {
  const manifest = useContext(ManifestContext);
  if (!manifest) {
    throw new Error('Context must be used within a Provider');
  }
  return manifest;
}
