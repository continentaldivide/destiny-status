'use client';

import CharacterEquipmentType from '../_interfaces/CharacterEquipment.interface';
import Character from './Character';
import { usePlayerContext } from '../_context/PlayerContext';

export default function CharacterContainer() {
  const { characterData, itemInstances } = usePlayerContext();
  const characterIds = Object.keys(characterData);

  const characters = characterIds.map((characterId, i) => {
    const itemHashes = characterData[characterId].items.map((item: any) => {
      return item.itemHash;
    });
    const itemInstanceIds = characterData[characterId].items.map(
      (item: any) => {
        return item.itemInstanceId;
      }
    );

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
