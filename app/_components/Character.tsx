import Item from './Item';
import MissingItem from './MissingItem';
import { usePlayerContext } from '../_context/PlayerContext';
import { useManifestContext } from '../_context/ManifestContext';

export default function Character({ characterId }: { characterId: string }) {
  const { characterEquipment, itemInstances } = usePlayerContext();
  const { DestinyInventoryItemDefinition } = useManifestContext();

  const ids: {
    [key: number]: boolean;
  } = {
    1498876634: false, // primary weapon
    2465295065: false, // energy weapon
    953998645: false, // heavy weapon
    3448274439: false, // helmet
    3551918588: false, // chest
    14239492: false, // gloves
    20886954: false, // legs
    1585787867: false, // class item
    4023194814: false, // ghost
    2025709351: false, // sparrow
    284967655: false, // ship
  };

  const itemHashes = characterEquipment[characterId].items.map((item) => {
    return item.itemHash;
  });

  const itemInstanceIds = characterEquipment[characterId].items.map((item) => {
    return item.itemInstanceId;
  });

  const itemComponents = itemHashes.map((itemHash, i) => {
    const item = DestinyInventoryItemDefinition[itemHash];
    item.equippingBlock
      ? (ids[item.equippingBlock.equipmentSlotTypeHash] = true)
      : null;
    return (
      <Item
        itemInstance={itemInstances[itemInstanceIds[i]]}
        item={item}
        key={i}
      />
    );
  });

  console.log(ids);

  // character should contain 11 items: 3 weapons, 5 armor pieces, ghost, sparrow, ship
  while (itemComponents.length < 11) {
    itemComponents.push(<MissingItem key={itemComponents.length} />);
  }

  return <div className="rounded-md bg-gray-900">{itemComponents}</div>;
}
