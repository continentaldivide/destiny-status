import Item from './Item';
import MissingItem from './MissingItem';
import { usePlayerContext } from '../_context/PlayerContext';
import { useManifestContext } from '../_context/ManifestContext';

export default function Character({ characterId }: { characterId: string }) {
  const { characterEquipment, itemInstances } = usePlayerContext();
  const { DestinyInventoryItemDefinition } = useManifestContext();

  const itemHashes = characterEquipment[characterId].items.map((item) => {
    return item.itemHash;
  });

  const itemInstanceIds = characterEquipment[characterId].items.map((item) => {
    return item.itemInstanceId;
  });

  const itemComponents = itemHashes.map((itemHash, i) => {
    const item = DestinyInventoryItemDefinition[itemHash];
    return (
      <Item
        itemInstance={itemInstances[itemInstanceIds[i]]}
        item={item}
        key={i}
      />
    );
  });

  // character should contain 11 items: 3 weapons, 5 armor pieces, ghost, sparrow, ship
  while (itemComponents.length < 11) {
    itemComponents.push(<MissingItem key={itemComponents.length} />);
  }

  return <div className="rounded-md bg-gray-900">{itemComponents}</div>;
}
