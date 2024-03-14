import ItemPerkType from '../_interfaces/ItemPerk.interface';
import { useManifestContext } from '../_context/ManifestContext';
import Image from 'next/image';

export default function ItemPerk({ itemPerk }: { itemPerk: ItemPerkType }) {
  const { DestinySandboxPerkDefinition } = useManifestContext();
  if (itemPerk.visible) {
    console.log(DestinySandboxPerkDefinition[itemPerk.perkHash]);
  }

  return (
    <div>
      {itemPerk.visible ? (
        <div>
          <Image
            unoptimized
            src={`https://bungie.net${itemPerk.iconPath}`}
            alt=""
            width={24}
            height={24}
          />
        </div>
      ) : null}
    </div>
  );
}
