'use client';

import { useState, useEffect } from 'react';
import ItemInstanceType from '../_interfaces/InventoryItemInstance.interface';
import Item from './Item';

type Props = {
  itemHashes: number[];
  itemInstanceIds: string[];
  itemInstances: {
    [key: string]: ItemInstanceType;
  };
};

export default function Character({
  itemHashes,
  itemInstanceIds,
  itemInstances,
}: Props) {
  const [itemComponents, setItemComponents] = useState<JSX.Element[]>();

  useEffect(() => {
    const itemComponents = itemHashes.map((item, i) => {
      return (
        <Item
          itemHash={item}
          itemInstance={itemInstances[itemInstanceIds[i]]}
          key={i}
        />
      );
    });
    setItemComponents(itemComponents);
  }, [itemHashes]);

  return <div className="border border-sky-500">{itemComponents}</div>;
}
