import ItemInstanceType from './InventoryItemInstance.interface';
import CharacterEquipmentType from './CharacterEquipment.interface';

export default interface PlayerContextType {
  characterData: {
    [key: string]: CharacterEquipmentType;
  };
  itemInstances: {
    [key: string]: ItemInstanceType;
  };
}
