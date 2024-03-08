import ItemInstanceType from './InventoryItemInstance.interface';
import CharacterEquipmentType from './CharacterEquipment.interface';

export default interface PlayerContextType {
  characterEquipment: Record<string, CharacterEquipmentType>;
  itemInstances: Record<string, ItemInstanceType>;
}
