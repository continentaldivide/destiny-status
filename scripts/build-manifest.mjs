// Builds the slim manifest that the server uses to resolve item hashes into
// display data.  Run automatically before `next build` via the `prebuild`
// script, or on demand with `npm run build:manifest`.
//
// Bungie's aggregate world content is ~379MB of JSON across 98 tables.  We need
// four of those tables, and only a handful of fields from the largest one, so
// this fetches the individual component tables and projects each entry down to
// what the UI actually reads.  The result is small enough to ship inside
// the serverless function and parse once per cold start.

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUTPUT_DIR = path.join(process.cwd(), 'manifest-data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'slim.json');

// The item table is the only one big enough to be worth trimming: it carries
// ~39k entries at ~189MB.  The other three total under 3MB, so we keep them
// whole rather than coupling this script to every field a component might grow
// to use.
const WHOLE_TABLES = [
  'DestinyDamageTypeDefinition',
  'DestinySandboxPerkDefinition',
  'DestinyStatDefinition',
];

const RETRIES = 4;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Bungie's endpoints return transient 5xx often enough that a single blip
// shouldn't fail a deploy.  A persistent outage still does, which is what we
// want: Vercel keeps the previous deployment serving.
const fetchJson = async (url, label) => {
  let lastError;
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < RETRIES) {
        const backoff = 2 ** attempt * 1000;
        console.warn(
          `  ${label}: ${error.message} (attempt ${attempt}/${RETRIES}), retrying in ${backoff}ms`
        );
        await sleep(backoff);
      }
    }
  }
  throw new Error(`${label}: ${lastError.message} after ${RETRIES} attempts`);
};

// Keep only the fields read by Character.tsx and Item.tsx.  This mirrors
// ItemType in _interfaces/manifestTables/DestinyInventoryItemDefinition.
const projectItem = (item) => {
  const projected = {
    displayProperties: {
      name: item.displayProperties?.name ?? '',
      icon: item.displayProperties?.icon ?? '',
    },
  };
  if (item.iconWatermark) {
    projected.iconWatermark = item.iconWatermark;
  }
  const slotHash = item.equippingBlock?.equipmentSlotTypeHash;
  if (slotHash !== undefined) {
    projected.equippingBlock = { equipmentSlotTypeHash: slotHash };
  }
  return projected;
};

const buildManifest = async () => {
  const metadata = await fetchJson(
    'https://www.bungie.net/Platform/Destiny2/Manifest/',
    'manifest metadata'
  );
  if (!metadata.Response) {
    throw new Error(
      `manifest metadata: unexpected response (ErrorCode ${metadata.ErrorCode})`
    );
  }

  const { version } = metadata.Response;
  const paths = metadata.Response.jsonWorldComponentContentPaths?.en;
  if (!paths) {
    throw new Error('manifest metadata: no English component content paths');
  }

  console.log(`Building slim manifest for version ${version}`);

  const tables = {};

  const itemTable = await fetchJson(
    `https://www.bungie.net${paths.DestinyInventoryItemDefinition}`,
    'DestinyInventoryItemDefinition'
  );
  tables.DestinyInventoryItemDefinition = Object.fromEntries(
    Object.entries(itemTable).map(([hash, item]) => [hash, projectItem(item)])
  );
  console.log(
    `  DestinyInventoryItemDefinition: ${
      Object.keys(itemTable).length
    } entries (trimmed)`
  );

  for (const table of WHOLE_TABLES) {
    tables[table] = await fetchJson(
      `https://www.bungie.net${paths[table]}`,
      table
    );
    console.log(`  ${table}: ${Object.keys(tables[table]).length} entries`);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  const serialized = JSON.stringify({ version, tables });
  await writeFile(OUTPUT_FILE, serialized);

  const megabytes = (serialized.length / 1024 / 1024).toFixed(1);
  console.log(`Wrote ${OUTPUT_FILE} (${megabytes}MB)`);
};

// Fail the build loudly rather than deploying a build with a missing or partial
// manifest.  Vercel keeps the previous deployment serving when a build fails.
buildManifest().catch((error) => {
  console.error(`Failed to build slim manifest: ${error.message}`);
  process.exit(1);
});
