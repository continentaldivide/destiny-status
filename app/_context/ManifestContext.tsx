import { useState, useEffect, createContext } from 'react';
import { useManifestStatus } from '../_hooks/useManifestStatus';
import { get } from 'idb-keyval';
import { ItemTableType } from '../_interfaces/manifestTables/DestinyInventoryItemDefinition.interface';

export const ManifestContext = createContext<ItemTableType>({});

export function ManifestContextProvider(props: any) {
  const manifestIsLoaded = useManifestStatus();
  const [itemDefinitions, setItemDefinitions] = useState<ItemTableType>({});

  const getItemDefinitions = async () => {
    const manifest = await get('manifest');
    return manifest.DestinyItemInventoryDefinition;
  };

  useEffect(() => {
    if (!manifestIsLoaded) return;
    (async () => {
      const itemDefinitions: ItemTableType = await getItemDefinitions();
      setItemDefinitions(itemDefinitions);
    })();
  }, [manifestIsLoaded]);

  return (
    <>
      <ManifestContext.Provider value={itemDefinitions}>
        {Object.keys(itemDefinitions).length > 0 ? (
          props.children
        ) : (
          <p>loading...</p>
        )}
      </ManifestContext.Provider>
    </>
  );
}
