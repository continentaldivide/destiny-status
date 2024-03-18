import ItemPerkType from '../_interfaces/ItemPerk.interface';
import { useManifestContext } from '../_context/ManifestContext';
import Image from 'next/image';

export default function ItemPerk({ itemPerk }: { itemPerk: ItemPerkType }) {
  const { DestinySandboxPerkDefinition } = useManifestContext();

  if (!itemPerk.visible) {
    return null;
  }

  const perkDefinition = DestinySandboxPerkDefinition[itemPerk.perkHash];

  // notes for future: (a) eventually, would like to create a tooltip on hovering the perk that provides the user with some of the information available via perkDefinition.  (b) it seems like some of the perk images provided by bungie's API (specifically most of the armor perks) are not fully transparent, leading to a noticeable background square around the outside of the actual icon.  tried getting rid of this a bunch of different ways and ultimately decided to ship for now and revisit later.  might be worth reaching out to a dev of a different app like DIM to try to learn whether other folks have run into this and how they've solved it.

  return (
    <Image
      unoptimized
      src={`https://bungie.net${itemPerk.iconPath}`}
      alt=""
      width={24}
      height={24}
    />
  );
}
