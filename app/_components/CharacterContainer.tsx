import Character from './Character';
import { usePlayerContext } from '../_context/PlayerContext';

export default function CharacterContainer() {
  const { characterEquipment, itemInstances } = usePlayerContext();
  const characterIds = Object.keys(characterEquipment);

  const characters = characterIds.map((characterId, i) => {
    const itemHashes = characterEquipment[characterId].items.map((item: any) => {
      return item.itemHash;
    });
    const itemInstanceIds = characterEquipment[characterId].items.map(
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
