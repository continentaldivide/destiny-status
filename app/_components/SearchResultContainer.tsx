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
  
  const getPowerLevel = (acct) => {
    const firstCharacterId = Object.keys(acct.characters.data)[0]
    const firstCharacterObj = acct.characters.data[firstCharacterId]
    const powerLevelKey = 1935470627
    return firstCharacterObj.stats[powerLevelKey]
  }

  // following sort operation is likely hard to follow due to the complicated shape of the data.  searchResult.characters.data is an object whose keys are strings containing characterIds.  We want to access data from the "first" characterId (as this is the information we're digging into in each SearchResult component).  Since that key is a different value in each searchResult, the most straightforward way to access it systematically is invoking Object.keys() here as well.  The stat we're sorting by at the end of the expression is the character's power level.
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
  return <>{searchResultComponents}</>;
}
