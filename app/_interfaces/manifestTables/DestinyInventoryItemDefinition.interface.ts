export interface ItemType {
  displayProperties: {
    name: string;
    icon: string;
  };
  flavorText: string;
  iconWatermark?: string;
  itemTypeAndTierDisplayName: string;
}

export interface ItemTableType {
  [key: number]: ItemType;
}
