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
  const compareManifestVersion = async (fetchedVersionNumber: string) => {
    const cacheManifestVersion = await get('cacheManifestVersion');
    return cacheManifestVersion == fetchedVersionNumber;
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

  // initial API request for manifest metadata
  useEffect(() => {
    (async () => {
      const [version, path] = await fetchManifestData();
      setFetchedVersionNumber(version);
      setManifestPath(path);
    })();
  }, []);

  // once the previous effect is complete and state has been updated, check for version match and fetch the latest manifest if stored version is out of date
  useEffect(() => {
    if (manifestPath == '') return;
    (async () => {
      const manifestVersionsMatch = await compareManifestVersion(
        fetchedVersionNumber
      );
      if (manifestVersionsMatch) {
        console.log('stored manifest matches current version');
        setNewestManifestInStorage(true);
      } else {
        console.log(
          'stored manifest does not match current version -- downloading new manifest'
        );
        try {
          await fetchManifest();
          set('cacheManifestVersion', fetchedVersionNumber);
          setNewestManifestInStorage(true);
        } catch (e) {
          console.error('Could not fetch manifest');
        }
      }
    })();
  }, [manifestPath]);

  return newestManifestInStorage;
}
