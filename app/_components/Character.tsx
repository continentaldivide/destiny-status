import Item from './Item';
import { usePlayerContext } from '../_context/PlayerContext';

export default function Character({ characterId }: { characterId: string }) {
  const { characterEquipment, itemInstances } = usePlayerContext();

  const itemHashes = characterEquipment[characterId].items.map((item) => {
    return item.itemHash;
  });

  const itemInstanceIds = characterEquipment[characterId].items.map((item) => {
    return item.itemInstanceId;
  });

  const itemComponents = itemHashes.map((itemHash, i) => {
    return (
      <Item
        itemHash={itemHash}
        itemInstance={itemInstances[itemInstanceIds[i]]}
        key={i}
      />
    );
  });

  return <div className="rounded-md bg-gray-900">{itemComponents}</div>;
}
