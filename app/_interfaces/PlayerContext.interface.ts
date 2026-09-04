import ItemInstanceType from './InventoryItemInstance.interface';
import CharacterEquipmentType from './CharacterEquipment.interface';
import ItemPerkType from './ItemPerk.interface';
import ManifestType from './Manifest.interface';

export default interface PlayerContextType {
  characterEquipment: Record<string, CharacterEquipmentType>;
  itemInstances: Record<string, ItemInstanceType>;
  itemPerks: Record<string, { perks: ItemPerkType[] }>;
  // manifest definitions for the hashes referenced by this profile, resolved
  // server-side by /api/get-full-profile
  definitions: ManifestType;
  hasError: boolean;
}
