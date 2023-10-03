import CharacterDataType from '../CharacterData.interface';
import CharacterEquipmentType from '../CharacterEquipment.interface';
import ItemInstanceType from '../InventoryItemInstance.interface';

export default interface GetFullProfileResponseType {
  characters: {
    data: {
      [key: string]: CharacterDataType;
    };
  };
  characterEquipment: {
    data: {
      [key: string]: CharacterEquipmentType;
    };
  };
  itemComponents: {
    instances: {
      data: {
        [key: string]: ItemInstanceType;
      };
    };
  };
}
