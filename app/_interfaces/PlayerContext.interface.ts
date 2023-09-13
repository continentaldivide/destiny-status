import ItemInstanceType from './InventoryItemInstance.interface';
import CharacterEquipmentType from './CharacterEquipment.interface';

export default interface PlayerContextType {
  characterEquipment: {
    [key: string]: CharacterEquipmentType;
  };
  itemInstances: {
    [key: string]: ItemInstanceType;
  };
}
