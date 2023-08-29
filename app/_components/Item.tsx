'use client';

import { useContext } from 'react';
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
    <div className="flex mt-8 items-center">
      <img
        src={`https://bungie.net${definitions[itemHash].displayProperties.icon}`}
        alt=""
        style={{ height: '8em' }}
      />
      <div className="text-center grow">
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
