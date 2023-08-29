import { useState, useEffect, createContext, useContext } from 'react';
import { useManifestStatus } from '../_hooks/useManifestStatus';
import { get } from 'idb-keyval';

export const DestinyInventoryItemDefinitionContext = createContext();

export function DestinyInventoryItemDefinitionContextProvider(props: any) {
  const manifestIsLoaded = useManifestStatus();
  const [itemDefinitions, setItemDefinitions] = useState();

  const getItemDefinitions = async () => {
    const manifest = await get('manifest');
    return manifest.DestinyItemInventoryDefinition;
  };

  useEffect(() => {
    if (!manifestIsLoaded) return;
    (async () => {
      const itemDefinitions = await getItemDefinitions();
      setItemDefinitions(itemDefinitions);
    })();
  }, [manifestIsLoaded]);

  return (
    <>
      <DestinyInventoryItemDefinitionContext.Provider value={itemDefinitions}>
        {itemDefinitions ? props.children : <p>loading...</p>}
      </DestinyInventoryItemDefinitionContext.Provider>
    </>
  );
}
