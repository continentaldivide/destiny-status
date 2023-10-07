import SearchResult from './SearchResult';
import { GetBasicProfileResponseType } from '../_interfaces/BungieAPI/GetBasicProfileResponse.interface';

type Props = {
  searchResults: GetBasicProfileResponseType[];
  setSearchResults: React.Dispatch<
    React.SetStateAction<GetBasicProfileResponseType[]>
  >;
  setCurrentUserData: React.Dispatch<
    React.SetStateAction<{ membershipId: string; membershipType: number }>
  >;
};

export default function SearchResultContainer({
  searchResults,
  setSearchResults,
  setCurrentUserData,
}: Props) {
  const handleUserClick = (membershipId: string, membershipType: number) => {
    setCurrentUserData({ membershipId, membershipType });
    setSearchResults([]);
  };
  const searchResultComponents = searchResults.map((searchResult, i) => {
    return (
      <SearchResult
        profileData={searchResult}
        handleUserClick={handleUserClick}
        key={`search result ${i}`}
      />
    );
  });
  return <>{searchResultComponents}</>;
}