import Image from 'next/image';
import ItemPerk from './ItemPerk';
import { useManifestContext } from '../_context/ManifestContext';
import ItemInstanceType from '../_interfaces/InventoryItemInstance.interface';
import ItemPerkType from '../_interfaces/ItemPerk.interface';
import { DamageType } from '../_interfaces/manifestTables/DestinyDamageTypeDefinition.interface';
import { ItemType } from '../_interfaces/manifestTables/DestinyInventoryItemDefinition.interface';

type Props = {
  itemInstance: ItemInstanceType;
  // ships have no perks, so itemPerks will necessarily be undefined for one item per character.  would like to come back to this and refactor in a way that can distinguish between this and unintentionally undefined results
  itemPerks: { perks: ItemPerkType[] } | undefined;
  item: ItemType;
};

export default function Item({ itemInstance, itemPerks, item }: Props) {
  const { DestinyDamageTypeDefinition, DestinyStatDefinition } =
    useManifestContext();

  let itemPerkComponents: JSX.Element[] = [];

  if (itemPerks) {
    itemPerkComponents = itemPerks.perks.map(
      (itemPerk: ItemPerkType, i: number) => {
        return <ItemPerk itemPerk={itemPerk} key={`itemPerk ${i}`} />;
      }
    );
  }

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
        <div className="absolute bottom-0 right-0 w-full text-power-level drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-gradient-to-l from-slate-500/25">
          {powerLevel ? (
            <p className="text-sm text-end font-semibold pr-0.5">
              {powerLevel}
            </p>
          ) : null}
        </div>
      </div>
      <div className="w-60 p-2 flex flex-col justify-between">
        <div className="flex gap-1 justify-end">
          <p className="text-sm truncate">{item.displayProperties.name}</p>
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
        <div className="flex gap-0.5 items-center justify-end">
          {itemPerkComponents}
        </div>
      </div>
    </div>
  );
}
