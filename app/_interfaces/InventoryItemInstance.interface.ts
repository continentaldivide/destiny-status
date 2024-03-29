export default interface ItemInstanceType {
  damageType: number;
  damageTypeHash?: number;
  primaryStat?: {
    statHash: number;
    value: number;
  };
  itemLevel: number;
  quality: number;
  isEquipped: boolean;
  canEquip: boolean;
  equipRequiredLevel: number;
  unlockHashesRequiredToEquip: Record<number, number>;
  cannotEquipReason: number;
}
