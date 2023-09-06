export interface StatType {
  displayProperties: {
    description: string;
    name: string;
    icon?: string;
    hasIcon: boolean;
  };
  aggregationType: number;
  hasComputedBlock: boolean;
  statCategory: number;
  hash: number;
  index: number;
  redacted: boolean;
  blacklisted: boolean;
}

export interface StatTableType {
  [key: number]: StatType;
}
