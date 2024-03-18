import ItemInstanceType from './InventoryItemInstance.interface';
import CharacterEquipmentType from './CharacterEquipment.interface';
import ItemPerkType from './ItemPerk.interface';

export default interface PlayerContextType {
  characterEquipment: Record<string, CharacterEquipmentType>;
  itemInstances: Record<string, ItemInstanceType>;
  itemPerks: Record<string, { perks: ItemPerkType[] }>;
}
