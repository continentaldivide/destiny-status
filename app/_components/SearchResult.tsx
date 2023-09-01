type Props = {
  displayName: string;
  displayNameCode: string;
  handleUserClick: () => void;
};

export default function SearchResult({
  displayName,
  displayNameCode,
  handleUserClick,
}: Props) {
  return (
    <div className="cursor-pointer hover:bg-slate-700">
      <p onClick={handleUserClick}>
        {displayName} #{displayNameCode}
      </p>
    </div>
  );
}
