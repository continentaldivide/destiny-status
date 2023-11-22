import SearchResult from './SearchResult';
import LoadingSearchResultContainer from './Loading/LoadingSearchResultContainer';
import { GetBasicProfileResponseType } from '../_interfaces/BungieAPI/GetBasicProfileResponse.interface';
import { useState, useEffect } from 'react';

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
  const [zeroResultsMessage, setZeroResultsMessage] = useState('');

  useEffect(() => {
    // without this useEffect to change zeroResultsMessage (i.e., with the message in place of the variable in the return), fetchingData changes too slowly and there's a brief moment where "no results found for X" is shown before the loading animation takes over.  This effect prevents that text from existing until at least one fetch has occurred.
    if (fetchingData) {
      setZeroResultsMessage(`no results found for ${username}`);
    }
  }, [fetchingData]);

  const handleUserClick = (membershipId: string, membershipType: number) => {
    setCurrentUserData({ membershipId, membershipType });
    setSearchResults([]);
  };

  const getPowerLevel = (acct: GetBasicProfileResponseType) => {
    const firstCharacterId = Object.keys(acct.characters.data)[0];
    const firstCharacterObj = acct.characters.data[firstCharacterId];
    const powerLevelKey = 1935470627;
    return firstCharacterObj.stats[powerLevelKey];
  };

  // Tom wrote some of this code on github
  searchResults.sort((a, b) => getPowerLevel(b) - getPowerLevel(a));

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
    return <LoadingSearchResultContainer />;
  }

  return (
    <>
      {searchResults.length === 0 && username !== ''
        ? zeroResultsMessage
        : searchResultComponents}
    </>
  );
}
