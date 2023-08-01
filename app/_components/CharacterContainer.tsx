'use client';

import Character from './Character';

type Props = {
  characterData: {
    [key: string]: {
      // can come back to fix later -- unsure of how we want the data long-term
      items: any[];
    };
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
    const itemHashes: number[] = characterData[characterId].items.map(
      (item, i) => {
        return item.itemHash;
      }
    );
    const itemInstanceIds: number[] = characterData[characterId].items.map(
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
