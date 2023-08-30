'use client';

import CharacterEquipmentType from '../_interfaces/CharacterEquipment.interface';
import Character from './Character';

type Props = {
  characterData: {
    [key: string]: CharacterEquipmentType;
  };
  itemInstances: {};
};

export default function CharacterContainer({
  characterData,
  itemInstances,
}: Props) {
  const characterIds = Object.keys(characterData);
  
  const characters = characterIds.map((characterId, i) => {
    const itemHashes = characterData[characterId].items.map((item) => {
      return item.itemHash;
    });
    const itemInstanceIds = characterData[characterId].items.map((item) => {
      return item.itemInstanceId;
    });

    return (
      <Character
        itemHashes={itemHashes}
        itemInstanceIds={itemInstanceIds}
        itemInstances={itemInstances}
        key={i}
      />
    );
  });

  return <div className="flex gap-4">{characters}</div>;
}
