'use client';

import { useState, useEffect } from 'react';
import Nav from './_components/Nav';
import CharacterContainer from './_components/CharacterContainer';
import SearchResult from './_components/SearchResult';
import PlayerSearchResultType from './_interfaces/PlayerSearchResult.interface';
import { ManifestContextProvider } from './_context/ManifestContext';
import { PlayerContextProvider } from './_context/PlayerContext';

export default function Home() {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<PlayerSearchResultType[]>(
    []
  );
  const [searchResultComponents, setSearchResultComponents] = useState<
    JSX.Element[]
  >([]);
  const [currentUserData, setCurrentUserData] = useState({
    membershipId: '',
    membershipType: 0,
  });

  useEffect(() => {
    const fetchUsers = setTimeout(async () => {
      if (username.length === 0) {
        setSearchResults([]);
        return;
      }
      try {
        const response = await fetch(`api/bungie-user-search`, {
          method: 'POST',
          body: JSON.stringify({ username }),
        });
        const data = await response.json();
        setSearchResults(data.searchResults);
      } catch (error) {
        console.log(error);
      }
    }, 300);
    return () => clearTimeout(fetchUsers);
  }, [username]);

  useEffect(() => {
    if (searchResults.length === 0) {
      setSearchResultComponents([]);
      return;
    }
    const searchResultComponents = searchResults.map((searchResult, i) => {
      return (
        <SearchResult
          displayName={searchResult.bungieGlobalDisplayName}
          displayNameCode={searchResult.bungieGlobalDisplayNameCode.toString()}
          handleUserClick={() =>
            handleUserClick(
              searchResult.destinyMemberships[0].membershipId,
              searchResult.destinyMemberships[0].membershipType
            )
          }
          key={`search result ${i}`}
        />
      );
    });
    setSearchResultComponents(searchResultComponents);
  }, [searchResults]);

  const handleUserClick = (membershipId: string, membershipType: number) => {
    setCurrentUserData({ membershipId, membershipType });
  };

  const searchResultsContainer = (
    <div className="max-h-60 w-60 overflow-auto bg-slate-900 border border-slate-500">
      {searchResultComponents}
    </div>
  );

  return (
    <>
      <Nav setUsername={setUsername} />
      <main className="flex min-h-screen flex-col items-center pt-24">
        <ManifestContextProvider>
          <div className="flex flex-col items-center mt-2 gap-1">
            <input
              value={username}
              placeholder="search by Bungie name..."
              className="bg-slate-900 border border-slate-500 w-60"
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* need to rewrite this to show the user some kind of difference between an empty input and an input that returned no results from Bungie */}
            {searchResultComponents.length ? searchResultsContainer : null}
          </div>
          <PlayerContextProvider currentUserData={currentUserData}>
            <CharacterContainer />
          </PlayerContextProvider>
        </ManifestContextProvider>
      </main>
    </>
  );
}
