import { resolveItems, pickDefinitions, loadManifest } from './manifest';
import { GetFullProfileResponseType } from '../_interfaces/BungieAPI/GetFullProfileResponse.interface';
import CharacterEquipmentType from '../_interfaces/CharacterEquipment.interface';
import ItemInstanceType from '../_interfaces/InventoryItemInstance.interface';
import ItemPerkType from '../_interfaces/ItemPerk.interface';
import ManifestType from '../_interfaces/Manifest.interface';

// Turns Bungie's hash-only profile response into one the client can render on
// its own, by attaching definitions for exactly the hashes it contains.

export type EnrichedProfileType = {
  characterEquipment: Record<string, CharacterEquipmentType>;
  itemInstances: Record<string, ItemInstanceType>;
  itemPerks: Record<string, { perks: ItemPerkType[] }>;
  definitions: ManifestType;
};

// Item.tsx reads the power stat's icon out of the manifest to label power
// levels.  The hash is stable and hardcoded there, so we always include it.
const POWER_STAT_HASH = '1935470627';

// transferStatus 3 marks the 'equipment' that can't move between characters:
// subclass, clan banner, emblem, emotes and finishers.  None of it is rendered,
// so dropping it here keeps us from resolving definitions we'd only discard.
// ref https://bungie-net.github.io/multi/schema_Destiny-TransferStatuses.html
const isDisplayable = (item: { transferStatus: number }) =>
  item.transferStatus !== 3;

export async function enrichProfile(
  profile: GetFullProfileResponseType
): Promise<EnrichedProfileType> {
  const { tables } = loadManifest();

  const equipment = profile.characterEquipment.data;
  const itemInstances = profile.itemComponents.instances.data;
  const itemPerks = profile.itemComponents.perks.data;

  const filteredEquipment: Record<string, CharacterEquipmentType> = {};
  const itemHashes: string[] = [];

  Object.keys(equipment).forEach((characterId) => {
    const items = equipment[characterId].items.filter(isDisplayable);
    filteredEquipment[characterId] = { items };
    items.forEach((item) => itemHashes.push(String(item.itemHash)));
  });

  const itemDefinitions = await resolveItems(itemHashes);

  // An item we couldn't resolve has no name or icon to render, and Character.tsx
  // would fault reading its equippingBlock.  Dropping it leaves the slot empty,
  // which the existing MissingItem path already handles gracefully.
  Object.keys(filteredEquipment).forEach((characterId) => {
    filteredEquipment[characterId] = {
      items: filteredEquipment[characterId].items.filter(
        (item) => itemDefinitions[String(item.itemHash)]
      ),
    };
  });

  const damageTypeHashes: string[] = [];
  const statHashes: string[] = [POWER_STAT_HASH];
  Object.keys(itemInstances).forEach((instanceId) => {
    const instance = itemInstances[instanceId];
    if (instance.damageTypeHash) {
      damageTypeHashes.push(String(instance.damageTypeHash));
    }
    if (instance.primaryStat) {
      statHashes.push(String(instance.primaryStat.statHash));
    }
  });

  const perkHashes: string[] = [];
  Object.keys(itemPerks).forEach((instanceId) => {
    itemPerks[instanceId].perks.forEach((perk) =>
      perkHashes.push(String(perk.perkHash))
    );
  });

  return {
    characterEquipment: filteredEquipment,
    itemInstances,
    itemPerks,
    definitions: {
      DestinyInventoryItemDefinition: itemDefinitions,
      DestinyDamageTypeDefinition: pickDefinitions(
        tables.DestinyDamageTypeDefinition,
        damageTypeHashes
      ),
      DestinySandboxPerkDefinition: pickDefinitions(
        tables.DestinySandboxPerkDefinition,
        perkHashes
      ),
      DestinyStatDefinition: pickDefinitions(
        tables.DestinyStatDefinition,
        statHashes
      ),
    },
  };
}
