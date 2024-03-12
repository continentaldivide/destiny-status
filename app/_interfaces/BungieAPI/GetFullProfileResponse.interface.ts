import CharacterDataType from '../CharacterData.interface';
import CharacterEquipmentType from '../CharacterEquipment.interface';
import ItemInstanceType from '../InventoryItemInstance.interface';
import ItemPerkType from '../ItemPerk.interface';

export interface GetFullProfileType {
  Response: GetFullProfileResponseType;
}

export interface GetFullProfileResponseType {
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
    perks: {
      data: {
        [key: string]: ItemPerkType;
      };
    };
  };
}
