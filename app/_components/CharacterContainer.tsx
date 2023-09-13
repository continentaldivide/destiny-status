import Character from './Character';
import { usePlayerContext } from '../_context/PlayerContext';

export default function CharacterContainer() {
  const { characterEquipment } = usePlayerContext();
  const characterIds = Object.keys(characterEquipment);

  const characters = characterIds.map((characterId, i) => {
    return <Character characterId={characterId} key={i} />;
  });

  return <div className="flex gap-4">{characters}</div>;
}
