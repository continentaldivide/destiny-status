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

  // following sort operation is likely hard to follow due to the complicated shape of the data.  searchResult.characters.data is an object whose keys are strings containing characterIds.  We want to access data from the "first" characterId (as this is the information we're digging into in each SearchResult component).  Since that key is a different value in each searchResult, the most straightforward way to access it systematically is invoking Object.keys() here as well.  The stat we're sorting by at the end of the expression is the character's power level.
  searchResults.sort(
    (a, b) =>
      b.characters.data[Object.keys(b.characters.data)[0]].stats[1935470627] -
      a.characters.data[Object.keys(a.characters.data)[0]].stats[1935470627]
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
