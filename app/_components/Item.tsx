import { useManifestContext } from '../_context/ManifestContext';
import Image from 'next/image';
import ItemInstanceType from '../_interfaces/InventoryItemInstance.interface';
import { DamageType } from '../_interfaces/manifestTables/DestinyDamageTypeDefinition.interface';

type Props = {
  itemHash: number;
  itemInstance: ItemInstanceType;
};

export default function Item({ itemHash, itemInstance }: Props) {
  const {
    DestinyDamageTypeDefinition,
    DestinyInventoryItemDefinition,
    DestinyStatDefinition,
  } = useManifestContext();

  const item = DestinyInventoryItemDefinition[itemHash];
  let damageType: DamageType | undefined = undefined;
  if (itemInstance.damageTypeHash) {
    damageType = DestinyDamageTypeDefinition[itemInstance.damageTypeHash];
  }

  let powerLevel: number | undefined = undefined;
  let powerIconPath: string | undefined = undefined;

  // there are a few primaryStats that I'm leaning towards not showing the user (mainly, sparrow speed) -- for now, we'll add a second conditional to exclude values low enough that they clearly represent something other than power...may reconsider this later though
  if (itemInstance.primaryStat && itemInstance.primaryStat.value >= 1600) {
    powerLevel = itemInstance.primaryStat.value;
    // hash below is for the "power" stat so we can get a link to its icon, the path of which seems to be variable over time.  reluctant to lean too heavily on a hardcoded value here, but it *looks* like manifest entities don't have their hashes change, at least not commonly.  probably worth revisiting this to see if there's a more systematic way to source the icon URL
    powerIconPath = DestinyStatDefinition[1935470627].displayProperties.icon;
  }

  return (
    <div className="flex bg-slate-700 max-h-20 m-2 rounded-md">
      <div className="relative border-r-2 border-gray-900">
        <Image
          unoptimized
          src={`https://bungie.net${item.displayProperties.icon}`}
          alt=""
          width={64}
          height={64}
          className="rounded-l-lg"
        />
        {/* ternary below is a safeguard for items that don't have a content-source watermark (e.g. "generalist shell") */}
        {item.iconWatermark ? (
          <div className="absolute top-0">
            <Image
              unoptimized
              src={`https://bungie.net${item.iconWatermark}`}
              alt=""
              width={64}
              height={64}
              className="rounded-l-lg"
            />
          </div>
        ) : null}
      </div>
      <div className="w-60 p-2 flex flex-col justify-between">
        <div className="flex gap-1 justify-end">
          <p>{item.displayProperties.name}</p>
          {damageType ? (
            <Image
              unoptimized
              src={`https://bungie.net${damageType.displayProperties.icon}`}
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
          ) : null}
        </div>
        <div className="flex gap-0.5 justify-end">
          {powerLevel ? (
            <p className="text-sm font-semibold">{powerLevel}</p>
          ) : null}
          {powerLevel ? (
            <Image
              unoptimized
              src={`https://bungie.net${powerIconPath}`}
              alt=""
              width={20}
              height={20}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
