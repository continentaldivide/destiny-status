import { useState, useEffect, createContext, useContext } from 'react';
import { get } from 'idb-keyval';
import { useManifestStatus } from '../_hooks/useManifestStatus';
import ManifestType from '../_interfaces/Manifest.interface';

export const ManifestContext = createContext<ManifestType | undefined>(
  undefined
);

export function ManifestContextProvider(props: any) {
  const manifestIsLoaded = useManifestStatus();
  const [manifest, setManifest] = useState<ManifestType | undefined>();
  const [manifestIsReady, setManifestIsReady] = useState(false);

  useEffect(() => {
    if (!manifestIsLoaded) return;
    (async () => {
      const manifest: ManifestType | undefined = await get('manifest');
      setManifest(manifest);
      setManifestIsReady(true);
    })();
  }, [manifestIsLoaded]);

  return (
    <ManifestContext.Provider value={manifest}>
      {manifestIsReady ? props.children : <p>loading...</p>}
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
