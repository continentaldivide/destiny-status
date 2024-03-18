import CharacterDataType from '../CharacterData.interface';
import CharacterEquipmentType from '../CharacterEquipment.interface';
import ItemInstanceType from '../InventoryItemInstance.interface';
import ItemPerkType from '../ItemPerk.interface';

export interface GetFullProfileType {
  Response: GetFullProfileResponseType;
}

export interface GetFullProfileResponseType {
  characters: {
    data: Record<string, CharacterDataType>;
  };
  characterEquipment: {
    data: Record<string, CharacterEquipmentType>;
  };
  itemComponents: {
    instances: {
      data: Record<string, ItemInstanceType>;
    };
    perks: {
      data: Record<string, {perks: ItemPerkType[]}>
    };
  };
}
