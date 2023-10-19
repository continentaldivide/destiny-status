import Character from './Character';
import LoadingCharacterContainer from './LoadingCharacterContainer';
import { usePlayerContext } from '../_context/PlayerContext';

export default function CharacterContainer({
  fetchingData,
}: {
  fetchingData: boolean;
}) {
  const { characterEquipment } = usePlayerContext();
  const characterIds = Object.keys(characterEquipment);

  const characters = characterIds.map((characterId, i) => {
    return <Character characterId={characterId} key={i} />;
  });

  if (fetchingData) {
    return <LoadingCharacterContainer />;
  }

  return <div className="flex gap-4">{characters}</div>;
}
