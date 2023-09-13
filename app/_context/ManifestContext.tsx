import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { get } from 'idb-keyval';
import { useManifestStatus } from '../_hooks/useManifestStatus';
import ManifestType from '../_interfaces/Manifest.interface';

const ManifestContext = createContext<ManifestType | undefined>(undefined);

export function ManifestContextProvider({ children }: { children: ReactNode }) {
  const newestManifestInStorage = useManifestStatus();
  const [manifest, setManifest] = useState<ManifestType | undefined>();
  const [manifestIsReady, setManifestIsReady] = useState(false);

  useEffect(() => {
    if (!newestManifestInStorage) return;
    (async () => {
      const manifest: ManifestType | undefined = await get('manifest');
      setManifest(manifest);
      setManifestIsReady(true);
    })();
  }, [newestManifestInStorage]);

  return (
    <ManifestContext.Provider value={manifest}>
      {manifestIsReady ? children : <p>loading...</p>}
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
