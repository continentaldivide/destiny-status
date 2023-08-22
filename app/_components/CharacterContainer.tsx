'use client';

import CharacterEquipmentType from '../_interfaces/CharacterEquipment.interface';
import Character from './Character';

type Props = {
  characterData: {
    [key: string]: CharacterEquipmentType;
  };
  itemDefinitions: {};
  itemInstances: {};
};

export default function CharacterContainer({
  characterData,
  itemDefinitions,
  itemInstances,
}: Props) {
  const characterIds = Object.keys(characterData);
  const characters = characterIds.map((characterId, i) => {
    const itemHashes = characterData[characterId].items.map(
      (item, i) => {
        return item.itemHash;
      }
    );
    const itemInstanceIds = characterData[characterId].items.map(
      (item, i) => {
        return item.itemInstanceId;
      }
    );

    return (
      <div key={i} style={{ listStyle: 'none', border: '1px solid purple' }}>
        {/* need to add dynamic character names */}
        <p className="text-center">CHARACTER</p>
        <Character
          itemDefinitions={itemDefinitions}
          itemHashes={itemHashes}
          itemInstanceIds={itemInstanceIds}
          itemInstances={itemInstances}
        />
      </div>
    );
  });

  return <div className="flex">{characters}</div>;
}
