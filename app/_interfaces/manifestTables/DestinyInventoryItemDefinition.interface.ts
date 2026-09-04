// Only the fields read by Character.tsx and Item.tsx.  These definitions now
// arrive per-profile from /api/get-full-profile rather than from a full copy of
// Bungie's manifest, so this interface doubles as the contract for what
// scripts/build-manifest.mjs projects each entry down to.
export interface ItemType {
  displayProperties: {
    name: string;
    icon: string;
  };
  equippingBlock?: {
    equipmentSlotTypeHash: number;
  };
  iconWatermark?: string;
}

export interface ItemTableType {
  [key: number]: ItemType;
}
