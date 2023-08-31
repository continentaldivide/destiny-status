import { useManifestContext } from '../_context/ManifestContext';
import Image from 'next/image';

type Props = {
  itemHash: number;
  powerLevel?: number;
};

export default function Item({ itemHash, powerLevel }: Props) {
  const { DestinyInventoryItemDefinition } = useManifestContext();
  const item = DestinyInventoryItemDefinition[itemHash];

  return (
    <div className="flex border border-pink-300">
      <div className="relative">
        <Image
          src={`https://bungie.net${item.displayProperties.icon}`}
          alt=""
          width={80}
          height={80}
          className="w-20"
        />
        {/* ternary below is a safeguard for items that don't have a content-source watermark (e.g. "generalist shell") */}
        {item.iconWatermark ? (
          <div className="absolute top-0">
            <Image
              src={`https://bungie.net${item.iconWatermark}`}
              alt=""
              width={80}
              height={80}
              className="w-20"
            />
          </div>
        ) : null}
      </div>
      <div className="grow text-right">
        <p className="text-xl">{item.displayProperties.name}</p>
        {powerLevel ? <p className="text-sm bold mt-2">{powerLevel}</p> : null}
        <p className="text-sm italic mt-2">{item.itemTypeAndTierDisplayName}</p>
      </div>
    </div>
  );
}
