'use client';
import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

export function useManifestStatus() {
  const [fetchedVersionNumber, setFetchedVersionNumber] = useState('');
  const [manifestPath, setManifestPath] = useState('');
  const [manifestLoaded, setManifestLoaded] = useState(false);

  // get the most recent manifest version and the location to download it
  const fetchManifestData = async () => {
    const response = await fetch(
      'https://www.bungie.net/Platform/Destiny2/manifest/'
    );
    const data = await response.json();
    return [data.Response.version, data.Response.jsonWorldContentPaths.en];
  };

  // check active manifest version against what's in keyval store
  const compareManifestVersion = async (fetchedVersionNumber: string) => {
    const cacheManifestVersion = await get('cacheManifestVersion');
    return cacheManifestVersion == fetchedVersionNumber;
  };

  // fetch current manifest from bungie and save it in store
  const fetchManifest = async () => {
    const response = await fetch(`https://www.bungie.net${manifestPath}`);
    const data = await response.json();
    console.log(data);
    set('manifest', {
      DestinyMilestoneDefinition: data.DestinyMilestoneDefinition,
      DestinyItemInventoryDefinition: data.DestinyInventoryItemDefinition,
    });
  };

  // initial API request to add relevant metadata to state
  useEffect(() => {
    (async () => {
      const [version, path] = await fetchManifestData();
      setFetchedVersionNumber(version);
      setManifestPath(path);
    })();
  }, []);

  // once the previous effect is complete and state variables have been updated, check for version match and fetch the manifest if mismatch
  useEffect(() => {
    if (manifestPath !== '') {
      (async () => {
        const manifestVersionsMatch = await compareManifestVersion(
          fetchedVersionNumber
        );
        if (manifestVersionsMatch) {
          console.log('stored manifest matches current version');
          setManifestLoaded(true);
        } else {
          console.log(
            'stored manifest does not match current version -- downloading new manifest'
          );
          // need to add error handling here to ensure that cacheManifestVersion doesn't get updated first and then immediately after fetchManifest() fails somehow.  Would lead to subsequent loads incorrectly thinking the newest manifest is present
          set('cacheManifestVersion', fetchedVersionNumber);
          await fetchManifest();
          setManifestLoaded(true);
        }
      })();
    }
  }, [manifestPath]);

  return manifestLoaded;
}
