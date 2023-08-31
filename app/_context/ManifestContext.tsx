import { useState, useEffect, createContext } from 'react';
import { useManifestStatus } from '../_hooks/useManifestStatus';
import { get } from 'idb-keyval';

export const ManifestContext = createContext({});

export function ManifestContextProvider(props: any) {
  const manifestIsLoaded = useManifestStatus();
  const [manifest, setManifest] = useState({});

  useEffect(() => {
    if (!manifestIsLoaded) return;
    (async () => {
      const manifest = await get('manifest');
      setManifest(manifest);
    })();
  }, [manifestIsLoaded]);

  return (
    <>
      <ManifestContext.Provider value={manifest}>
        {Object.keys(manifest).length > 0 ? props.children : <p>loading...</p>}
      </ManifestContext.Provider>
    </>
  );
}
