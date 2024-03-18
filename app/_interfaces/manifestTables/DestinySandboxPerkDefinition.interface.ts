export interface PerkType {
  blacklisted: boolean;
  damageType: number;
  displayProperties: {
    description: string;
    hasIcon: boolean;
    icon?: string;
    name: string;
  };
  hash: number;
  index: number;
  isDisplayable: boolean;
  redacted: boolean;
}

export interface PerkTableType {
  [key: number]: PerkType;
}
