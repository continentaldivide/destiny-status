import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { get } from 'idb-keyval';
import LoadingScreen from '../_components/Loading/LoadingScreen';
import { useManifestStatus } from '../_hooks/useManifestStatus';
import ManifestType from '../_interfaces/Manifest.interface';

const ManifestContext = createContext<ManifestType | undefined>(undefined);

export function ManifestContextProvider({ children }: { children: ReactNode }) {
  const manifestStatus = useManifestStatus();
  const [manifest, setManifest] = useState<ManifestType | undefined>();
  const [manifestIsReady, setManifestIsReady] = useState(false);
  const newestManifestInStorage =
    manifestStatus === 'Newest manifest in storage';
  const badApiResponse = manifestStatus === 'Bad API response';

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
  } else if (newestManifestInStorage) {
    pageContent = (
      <LoadingScreen loadingMessage={'Loading item definitions...'} />
    );
  } else if (badApiResponse) {
    // placeholder for a more fleshed-out notification re: API issues
    pageContent = <LoadingScreen loadingMessage={manifestStatus} />;
  } else {
    pageContent = <LoadingScreen loadingMessage={manifestStatus} />;
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
