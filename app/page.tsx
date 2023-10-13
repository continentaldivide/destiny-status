'use client';

import { useState, useEffect } from 'react';
import Nav from './_components/Nav';
import CharacterContainer from './_components/CharacterContainer';
import SearchResultContainer from './_components/SearchResultContainer';
import useGenerateSearchResults from './_hooks/useGenerateSearchResults';
import { GetBasicProfileResponseType } from './_interfaces/BungieAPI/GetBasicProfileResponse.interface';
import { ManifestContextProvider } from './_context/ManifestContext';
import { PlayerContextProvider } from './_context/PlayerContext';

export default function Home() {
  const [fetchingData, setFetchingData] = useState(false);
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<
    GetBasicProfileResponseType[]
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
      setFetchingData(true);
      const searchResults = await useGenerateSearchResults(username);
      setSearchResults(searchResults);
      setFetchingData(false);
    };
    getSearchResults();
    setCurrentUserData({ membershipId: '', membershipType: 0 });
  }, [username]);

  return (
    <>
      <ManifestContextProvider>
        <Nav fetchingData={fetchingData} setUsername={setUsername} />
        <main className="flex min-h-screen flex-col items-center pt-24">
          <PlayerContextProvider
            currentUserData={currentUserData}
            setFetchingData={setFetchingData}
          >
            {currentUserData.membershipId === '' ? (
              <SearchResultContainer
                username={username}
                fetchingData={fetchingData}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                setCurrentUserData={setCurrentUserData}
              />
            ) : (
              <CharacterContainer fetchingData={fetchingData} />
            )}
          </PlayerContextProvider>
        </main>
      </ManifestContextProvider>
    </>
  );
}
