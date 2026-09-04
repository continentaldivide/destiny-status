import { readFileSync } from 'node:fs';
import path from 'node:path';
import { DamageType } from '../_interfaces/manifestTables/DestinyDamageTypeDefinition.interface';
import { ItemType } from '../_interfaces/manifestTables/DestinyInventoryItemDefinition.interface';
import { PerkType } from '../_interfaces/manifestTables/DestinySandboxPerkDefinition.interface';
import { StatType } from '../_interfaces/manifestTables/DestinyStatDefinition.interface';

// Server-side access to the slim manifest built by scripts/build-manifest.mjs.
// The file ships inside the deployment, so resolving an item hash is an
// in-memory object lookup rather than anything the browser has to download.

export type ManifestTables = {
  DestinyInventoryItemDefinition: Record<string, ItemType>;
  DestinyDamageTypeDefinition: Record<string, DamageType>;
  DestinySandboxPerkDefinition: Record<string, PerkType>;
  DestinyStatDefinition: Record<string, StatType>;
};

type SlimManifest = {
  version: string;
  tables: ManifestTables;
};

const MANIFEST_PATH = path.join(process.cwd(), 'manifest-data', 'slim.json');

// Parsed once per cold start and reused by every warm
// invocation of the function.
let cached: SlimManifest | undefined;

export function loadManifest(): SlimManifest {
  if (cached) {
    return cached;
  }
  try {
    cached = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as SlimManifest;
  } catch (error) {
    throw new Error(
      `Slim manifest missing or unreadable at ${MANIFEST_PATH}. ` +
        `Run \`npm run build:manifest\` to generate it.`
    );
  }
  return cached;
}

// Bungie ships new manifest versions on patch days, so between a release and
// the redeploy triggered by the refresh-manifest workflow we can see hashes
// that predate our copy.  Falling back to the single-entity endpoint keeps
// brand-new gear rendering instead of disappearing.  Next's data cache holds
// each result so a given hash is only ever fetched once an hour.
async function fetchItemFromBungie(
  hash: string
): Promise<ItemType | undefined> {
  try {
    const response = await fetch(
      `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${hash}/`,
      {
        headers: { 'X-API-Key': `${process.env.REACT_APP_DESTINY_API_KEY}` },
        next: { revalidate: 3600 },
      }
    );
    const data = await response.json();
    if (data.ErrorCode !== 1 || !data.Response) {
      return undefined;
    }
    const item = data.Response;
    return {
      displayProperties: {
        name: item.displayProperties?.name ?? '',
        icon: item.displayProperties?.icon ?? '',
      },
      iconWatermark: item.iconWatermark,
      equippingBlock: item.equippingBlock?.equipmentSlotTypeHash
        ? { equipmentSlotTypeHash: item.equippingBlock.equipmentSlotTypeHash }
        : undefined,
    };
  } catch (error) {
    console.error(`Could not resolve item hash ${hash} from Bungie:`, error);
    return undefined;
  }
}

// Resolves every requested item hash, consulting Bungie only for the ones our
// copy of the manifest doesn't know about.  Hashes that can't be resolved at
// all are simply absent from the result; callers drop those items so the client
// never receives a hash it has no definition for.
export async function resolveItems(
  hashes: string[]
): Promise<Record<string, ItemType>> {
  const { tables } = loadManifest();
  const resolved: Record<string, ItemType> = {};
  const missing: string[] = [];

  for (const hash of hashes) {
    const item = tables.DestinyInventoryItemDefinition[hash];
    if (item) {
      resolved[hash] = item;
    } else {
      missing.push(hash);
    }
  }

  if (missing.length > 0) {
    console.warn(
      `${missing.length} item hash(es) missing from slim manifest; falling back to Bungie`
    );
    const fetched = await Promise.all(missing.map(fetchItemFromBungie));
    missing.forEach((hash, i) => {
      const item = fetched[i];
      if (item) {
        resolved[hash] = item;
      }
    });
  }

  return resolved;
}

// The remaining tables are small enough that we ship them whole, so these are
// plain lookups with no fallback path.
export function pickDefinitions<T>(
  table: Record<string, T>,
  hashes: string[]
): Record<string, T> {
  const picked: Record<string, T> = {};
  for (const hash of hashes) {
    const definition = table[hash];
    if (definition) {
      picked[hash] = definition;
    }
  }
  return picked;
}
