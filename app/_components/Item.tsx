'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { DestinyInventoryItemDefinitionContext } from '../_context/DestinyInventoryItemDefinitionContext';
import { ItemTableType } from '../_interfaces/manifestTables/DestinyInventoryItemDefinition.interface';

type Props = {
  itemHash: number;
  powerLevel?: number;
};

export default function Item({ itemHash, powerLevel }: Props) {
  const definitions: ItemTableType = useContext(
    DestinyInventoryItemDefinitionContext
  );
  return (
    <div className="flex border border-pink-300">
      <div className="relative">
        <Image
          src={`https://bungie.net${definitions[itemHash].displayProperties.icon}`}
          alt=""
          width={80}
          height={80}
          className="w-20"
        />

        {/* some items don't have a content-source watermark (e.g. "generalist shell") -- ternary here ensures the item has an iconWatermark property before trying to fetch from the image src */}

        {definitions[itemHash].iconWatermark ? (
          <div className="absolute top-0">
            <Image
              src={`https://bungie.net${definitions[itemHash].iconWatermark}`}
              alt=""
              width={80}
              height={80}
              className="w-20"
            />
          </div>
        ) : null}
      </div>
      <div className="grow text-right">
        <p className="text-xl">
          {definitions[itemHash].displayProperties.name}
        </p>
        {powerLevel ? <p className="text-sm bold mt-2">{powerLevel}</p> : null}
        <p className="text-sm italic mt-2">
          {definitions[itemHash].itemTypeAndTierDisplayName}
        </p>
      </div>
    </div>
  );
}
