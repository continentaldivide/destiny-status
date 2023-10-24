import LoadingCharacter from './LoadingCharacter';

export default function LoadingCharacterContainer() {
  return (
    <div className="flex gap-4">
      <LoadingCharacter />
      <LoadingCharacter />
      <LoadingCharacter />
    </div>
  );
}
