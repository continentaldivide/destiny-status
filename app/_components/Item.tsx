import { useManifestContext } from '../_context/ManifestContext';
import Image from 'next/image';
import ItemInstanceType from '../_interfaces/InventoryItemInstance.interface';
import { DamageType } from '../_interfaces/manifestTables/DestinyDamageTypeDefinition.interface';

type Props = {
  itemHash: number;
  powerLevel?: number;
  itemInstance: ItemInstanceType;
};

export default function Item({ itemHash, powerLevel, itemInstance }: Props) {
  const { DestinyDamageTypeDefinition, DestinyInventoryItemDefinition } =
    useManifestContext();
  const item = DestinyInventoryItemDefinition[itemHash];
  let damageType: DamageType | undefined = undefined;
  if (itemInstance.damageTypeHash) {
    damageType = DestinyDamageTypeDefinition[itemInstance.damageTypeHash];
  }

  return (
    <div className="flex border border-pink-300 w-80">
      <div className="relative">
        <Image
          src={`https://bungie.net${item.displayProperties.icon}`}
          alt=""
          width={80}
          height={80}
        />
        {/* ternary below is a safeguard for items that don't have a content-source watermark (e.g. "generalist shell") */}
        {item.iconWatermark ? (
          <div className="absolute top-0">
            <Image
              src={`https://bungie.net${item.iconWatermark}`}
              alt=""
              width={80}
              height={80}
            />
          </div>
        ) : null}
      </div>
      <div className="w-60 text-right">
        <div className="flex gap-1 justify-end">
          <p className="text-xl">{item.displayProperties.name}</p>
          {damageType ? (
            <Image
              src={`https://bungie.net${damageType.displayProperties.icon}`}
              alt=""
              width={80}
              height={80}
              className="w-8"
            />
          ) : null}
        </div>
        {powerLevel ? <p className="text-sm bold">{powerLevel}</p> : null}
      </div>
    </div>
  );
}
