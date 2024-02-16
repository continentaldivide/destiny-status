import LoadingCharacter from './LoadingCharacter';

export default function LoadingCharacterContainer({
  characterCount,
}: {
  characterCount: number;
}) {
  const loadingCharacters = [];
  while (loadingCharacters.length < characterCount) {
    loadingCharacters.push(<LoadingCharacter key={loadingCharacters.length} />);
  }
  return <div className="flex gap-4">{loadingCharacters}</div>;
}
