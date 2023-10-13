import SearchResult from './SearchResult';
import LoadingSearchResult from './LoadingSearchResult';
import { GetBasicProfileResponseType } from '../_interfaces/BungieAPI/GetBasicProfileResponse.interface';

type Props = {
  username: string;
  fetchingData: boolean;
  searchResults: GetBasicProfileResponseType[];
  setSearchResults: React.Dispatch<
    React.SetStateAction<GetBasicProfileResponseType[]>
  >;
  setCurrentUserData: React.Dispatch<
    React.SetStateAction<{ membershipId: string; membershipType: number }>
  >;
};

export default function SearchResultContainer({
  username,
  fetchingData,
  searchResults,
  setSearchResults,
  setCurrentUserData,
}: Props) {
  const handleUserClick = (membershipId: string, membershipType: number) => {
    setCurrentUserData({ membershipId, membershipType });
    setSearchResults([]);
  };
  
  const getPowerLevel = (acct: GetBasicProfileResponseType) => {
    const firstCharacterId = Object.keys(acct.characters.data)[0]
    const firstCharacterObj = acct.characters.data[firstCharacterId]
    const powerLevelKey = 1935470627
    return firstCharacterObj.stats[powerLevelKey]
  }

  // Tom wrote some of this code on github
  searchResults.sort(
    (a, b) =>
      getPowerLevel(b) - getPowerLevel(a)
  );

  const searchResultComponents = searchResults.map((searchResult, i) => {
    return (
      <SearchResult
        profileData={searchResult}
        handleUserClick={handleUserClick}
        key={`search result ${i}`}
      />
    );
  });

  if (fetchingData) {
    return <p>searching for {username}...</p>;
  }

  return (
    <>
      <LoadingSearchResult />
      {searchResults.length === 0 && username !== ''
        ? `no results found for ${username}`
        : searchResultComponents}
    </>
  );
}
