'use client';
import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

// This hook's role is to assess for ManifestContext whether the manifest tables we need are available in the client's browser storage, try to put them there if they're missing or out of date, and return a string expressing what step of the process is occurring.

export function useManifestStatus() {
  // probably a better solution for this, but the intent with manifestStatuses is (a) to make it easy to update and/or add statuses without accidentally overlooking a reference to one, and (b) for these to be 'developer' versions of the statuses to hand off to ManifestContext, where they can be 'translated' to user-facing messages as needed
  const manifestStatuses = {
    checkingVersion: 'checkingVersion',
    downloadingManifest: 'downloadingManifest',
    manifestReady: 'manifestReady',
    badApiResponse: 'badApiResponse',
  };
  const [fetchedVersionNumber, setFetchedVersionNumber] = useState('');
  const [manifestPath, setManifestPath] = useState('');
  const [manifestStatus, setManifestStatus] = useState(
    manifestStatuses.checkingVersion
  );

  // get the most recent manifest version number and its location
  const fetchManifestData = async () => {
    const response = await fetch(
      'https://www.bungie.net/Platform/Destiny2/manifest/'
    );
    const data = await response.json();
    if (!data.Response) {
      return {
        version: undefined,
        path: undefined,
      };
    }
    return {
      version: data.Response.version,
      path: data.Response.jsonWorldContentPaths.en,
    };
  };

  // check latest manifest version against what's in keyval store
  const compareStoredManifest = async (
    newestVersionNumber: string,
    requiredTables: string[]
  ) => {
    const cacheManifestVersion = await get('cacheManifestVersion');
    const storedTables = await get('storedTables');
    if (!storedTables) {
      return false;
    }
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
      const { version, path } = await fetchManifestData();
      if (!version || !path) {
        setManifestStatus(manifestStatuses.badApiResponse);
        return manifestStatus;
      }
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
        setManifestStatus(manifestStatuses.manifestReady);
      } else {
        console.log(
          'stored manifest does not match current version -- downloading new manifest'
        );
        try {
          setManifestStatus(manifestStatuses.downloadingManifest);
          await fetchManifest();
          set('cacheManifestVersion', fetchedVersionNumber);
          set('storedTables', requiredManifestTables);

          setManifestStatus(manifestStatuses.manifestReady);
        } catch (e) {
          console.error('Could not fetch manifest');
        }
      }
    })();
  }, [manifestPath]);

  return manifestStatus;
}
