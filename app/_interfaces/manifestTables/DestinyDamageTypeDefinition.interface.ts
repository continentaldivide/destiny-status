export interface DamageType {
  blacklisted: boolean;
  color: {
    alpha: number;
    blue: number;
    green: number;
    red: number;
  };
  displayProperties: {
    description: string;
    hasIcon: boolean;
    icon: string;
    name: string;
  };
  enumValue: number;
  hash: number;
  index: number;
  redacted: boolean;
  showIcon: boolean;
  transparentIconPath: string;
}

export interface DamageTableType {
  [key: number]: DamageType;
}
