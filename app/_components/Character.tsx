import Item from './Item';
import MissingItem from './MissingItem';
import { usePlayerContext } from '../_context/PlayerContext';
import { useManifestContext } from '../_context/ManifestContext';

export default function Character({ characterId }: { characterId: string }) {
  const { characterEquipment, itemInstances } = usePlayerContext();
  const { DestinyInventoryItemDefinition } = useManifestContext();

  const itemSlots: [number, boolean, string][] = [
    // the tuples in this array are composed of an equipmentSlotTypeHash, a boolean representing the presence of an item in that slot in the current user's inventory, and a string identifying the name of the item slot.  note that order is important here: this array is ordered to match the order in which Bungie's API returns equipped item results
    [1498876634, false, 'primary weapon'],
    [2465295065, false, 'energy weapon'],
    [953998645, false, 'heavy weapon'],
    [3448274439, false, 'helmet armor'],
    [3551918588, false, 'chest armor'],
    [14239492, false, 'gloves'],
    [20886954, false, 'leg armor'],
    [1585787867, false, 'class item'],
    [4023194814, false, 'ghost'],
    [2025709351, false, 'sparrow'],
    [284967655, false, 'ship'],
  ];

  const itemHashes = characterEquipment[characterId].items.map((item) => {
    return item.itemHash;
  });

  const itemInstanceIds = characterEquipment[characterId].items.map((item) => {
    return item.itemInstanceId;
  });

  const itemComponents = itemHashes.map((itemHash, i) => {
    const item = DestinyInventoryItemDefinition[itemHash];

    if (item.equippingBlock) {
      itemSlots.forEach((itemSlot) => {
        if (itemSlot[0] === item.equippingBlock?.equipmentSlotTypeHash) {
          itemSlot[1] = true;
        }
      });
    }

    return (
      <Item
        itemInstance={itemInstances[itemInstanceIds[i]]}
        item={item}
        key={i}
      />
    );
  });

  itemSlots.forEach((itemSlot, i) => {
    if (itemSlot[1] === false) {
      itemComponents.splice(
        i,
        0,
        <MissingItem itemSlot={itemSlot[2]} key={i} />
      );
    }
  });

  return <div className="rounded-md bg-gray-900">{itemComponents}</div>;
}
