'use client';
import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

export function useManifestStatus() {
  const [fetchedVersionNumber, setFetchedVersionNumber] = useState('');
  const [manifestPath, setManifestPath] = useState('');
  const [newestManifestInStorage, setNewestManifestInStorage] = useState(false);

  // get the most recent manifest version number and its location
  const fetchManifestData = async () => {
    const response = await fetch(
      'https://www.bungie.net/Platform/Destiny2/manifest/'
    );
    const data = await response.json();
    return [data.Response.version, data.Response.jsonWorldContentPaths.en];
  };

  // check latest manifest version against what's in keyval store
  const compareStoredManifest = async (
    newestVersionNumber: string,
    requiredTables: string[]
  ) => {
    const cacheManifestVersion = await get('cacheManifestVersion');
    const storedTables = await get('storedTables');
    const storedManifestIsNewest = cacheManifestVersion === newestVersionNumber;
    const storedManifestHasRequiredTables =
      storedTables.join() === requiredTables.join();
    return storedManifestIsNewest && storedManifestHasRequiredTables;
  };

  // fetch current manifest from bungie and save it in store
  const fetchManifest = async () => {
    const response = await fetch(`https://www.bungie.net${manifestPath}`);
    const {
      DestinyDamageTypeDefinition,
      DestinyInventoryItemDefinition,
      DestinyStatDefinition,
    } = await response.json();

    set('manifest', {
      DestinyDamageTypeDefinition,
      DestinyInventoryItemDefinition,
      DestinyStatDefinition,
    });
  };

  const requiredManifestTables = [
    'DestinyDamageTypeDefinition',
    'DestinyInventoryItemDefinition',
    'DestinyStatDefinition',
  ];

  // initial API request for manifest metadata
  useEffect(() => {
    (async () => {
      const [version, path] = await fetchManifestData();
      setFetchedVersionNumber(version);
      setManifestPath(path);
    })();
  }, []);

  // once the previous effect is complete and state has been updated, check for version match and fetch the latest manifest if stored version is out of date or if any required tables are missing
  useEffect(() => {
    if (manifestPath == '') return;
    (async () => {
      const manifestUpToDate = await compareStoredManifest(
        fetchedVersionNumber,
        requiredManifestTables
      );
      if (manifestUpToDate) {
        console.log('stored manifest matches current version');
        setNewestManifestInStorage(true);
      } else {
        console.log(
          'stored manifest does not match current version -- downloading new manifest'
        );
        try {
          await fetchManifest();
          set('cacheManifestVersion', fetchedVersionNumber);
          set('storedTables', requiredManifestTables);
          setNewestManifestInStorage(true);
        } catch (e) {
          console.error('Could not fetch manifest');
        }
      }
    })();
  }, [manifestPath]);

  return newestManifestInStorage;
}
