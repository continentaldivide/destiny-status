import LoadingItem from './LoadingItem';

export default function LoadingSearchResult() {
  const itemComponents = [];

  while (itemComponents.length < 11) {
    itemComponents.push(<LoadingItem key={itemComponents.length} />);
  }

  return <div className={`rounded-md bg-gray-900`}>{itemComponents}</div>;
}
