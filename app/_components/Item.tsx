import { useManifestContext } from '../_context/ManifestContext';
import Image from 'next/image';
import ItemInstanceType from '../_interfaces/InventoryItemInstance.interface';
import { DamageType } from '../_interfaces/manifestTables/DestinyDamageTypeDefinition.interface';

type Props = {
  itemHash: number;
  itemInstance: ItemInstanceType;
};

export default function Item({ itemHash, itemInstance }: Props) {
  const { DestinyDamageTypeDefinition, DestinyInventoryItemDefinition } =
    useManifestContext();
  const item = DestinyInventoryItemDefinition[itemHash];
  let damageType: DamageType | undefined = undefined;
  if (itemInstance.damageTypeHash) {
    damageType = DestinyDamageTypeDefinition[itemInstance.damageTypeHash];
  }

  let powerLevel: number | undefined = undefined;
  if (itemInstance.primaryStat) {
    powerLevel = itemInstance.primaryStat.value;
  }

  return (
    <div className="flex bg-slate-700 max-h-20 m-2 rounded-md">
      <div className="relative border-r-2 border-slate-800">
        <Image
          src={`https://bungie.net${item.displayProperties.icon}`}
          alt=""
          width={80}
          height={80}
          className="rounded-l-lg"
        />
        {/* ternary below is a safeguard for items that don't have a content-source watermark (e.g. "generalist shell") */}
        {item.iconWatermark ? (
          <div className="absolute top-0">
            <Image
              src={`https://bungie.net${item.iconWatermark}`}
              alt=""
              width={80}
              height={80}
              className="rounded-l-lg"
            />
          </div>
        ) : null}
      </div>
      <div className="w-60 text-right p-2">
        <div className="flex gap-1 justify-end">
          <p>{item.displayProperties.name}</p>
          {damageType ? (
            <Image
              src={`https://bungie.net${damageType.displayProperties.icon}`}
              alt=""
              width={30}
              height={30}
            />
          ) : null}
        </div>
        {powerLevel ? <p className="text-sm bold">{powerLevel}</p> : null}
      </div>
    </div>
  );
}
