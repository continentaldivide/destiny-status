import Character from './Character';
import ErrorMessage from './ErrorMessage';
import LoadingCharacterContainer from './Loading/LoadingCharacterContainer';
import { usePlayerContext } from '../_context/PlayerContext';

export default function CharacterContainer({
  fetchingData,
  characterCount,
}: {
  fetchingData: boolean;
  characterCount: number;
}) {
  const { characterEquipment, hasError } = usePlayerContext();
  const characterIds = Object.keys(characterEquipment);

  const characters = characterIds.map((characterId, i) => {
    return <Character characterId={characterId} key={i} />;
  });

  if (fetchingData) {
    return <LoadingCharacterContainer characterCount={characterCount} />;
  }

  if (hasError) {
    return <ErrorMessage />;
  }

  return <div className="flex gap-4">{characters}</div>;
}
