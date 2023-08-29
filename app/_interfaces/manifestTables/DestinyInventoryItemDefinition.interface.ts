export interface ItemType {
  displayProperties: {
    name: string;
    icon: string;
  };
  flavorText: string;
  itemTypeAndTierDisplayName: string;
}

export interface ItemTableType {
  [key: number]: ItemType;
}
