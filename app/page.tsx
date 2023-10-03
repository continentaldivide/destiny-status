'use client';

import { useState, useEffect } from 'react';
import Nav from './_components/Nav';
import CharacterContainer from './_components/CharacterContainer';
import NewSearchResult from './_components/NewSearchResult';
import useGenerateSearchResults from './_hooks/useGenerateSearchResults';
import { GetBasicProfileResponseType } from './_interfaces/BungieAPI/GetBasicProfileResponse.interface';
import { ManifestContextProvider } from './_context/ManifestContext';
import { PlayerContextProvider } from './_context/PlayerContext';

export default function Home() {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<
    GetBasicProfileResponseType[]
  >([]);
  const [searchResultComponents, setSearchResultComponents] = useState<
    JSX.Element[]
  >([]);
  const [currentUserData, setCurrentUserData] = useState({
    membershipId: '',
    membershipType: 0,
  });

  useEffect(() => {
    if (username.length === 0) {
      return;
    }
    const getSearchResults = async () => {
      const searchResults = await useGenerateSearchResults(username);
      setSearchResults(searchResults);
    };
    getSearchResults();
    setCurrentUserData({ membershipId: '', membershipType: 0 });
  }, [username]);

  useEffect(() => {
    if (searchResults.length === 0) {
      setSearchResultComponents([]);
      return;
    }

    const handleUserClick = (membershipId: string, membershipType: number) => {
      setCurrentUserData({ membershipId, membershipType });
      setSearchResultComponents([]);
    };

    const searchResultComponents = searchResults.map((searchResult, i) => {
      return (
        <NewSearchResult
          profileData={searchResult}
          handleUserClick={handleUserClick}
          key={`search result ${i}`}
        />
      );
    });
    setSearchResultComponents(searchResultComponents);
  }, [searchResults]);

  const searchResultsContainer = <>{searchResultComponents}</>;

  return (
    <>
      <ManifestContextProvider>
        <Nav setUsername={setUsername} />
        <main className="flex min-h-screen flex-col items-center pt-24">
          <PlayerContextProvider currentUserData={currentUserData}>
            {searchResultsContainer}
            {currentUserData.membershipId === '' ? null : (
              <CharacterContainer />
            )}
          </PlayerContextProvider>
        </main>
      </ManifestContextProvider>
    </>
  );
}
