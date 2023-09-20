import Item from './Item';
import MissingItem from './MissingItem';
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

  // character should contain 11 items: 3 weapons, 5 armor pieces, ghost, sparrow, ship
  while (itemComponents.length < 11) {
    itemComponents.push(<MissingItem />);
  }

  return <div className="rounded-md bg-gray-900">{itemComponents}</div>;
}
