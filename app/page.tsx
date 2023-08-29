'use client';

import { useState, useEffect } from 'react';
import CharacterContainer from './_components/CharacterContainer';
import SearchComponent from './_components/SearchResult';
import PlayerSearchResultType from './_interfaces/PlayerSearchResult.interface';
import { DestinyInventoryItemDefinitionContextProvider } from './_context/DestinyInventoryItemDefinitionContext';

const URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export default function Home() {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<PlayerSearchResultType[]>(
    []
  );
  const [searchResultComponents, setSearchResultComponents] = useState<
    JSX.Element[]
  >([]);
  const [currentUserMembershipId, setCurrentUserMembershipId] =
    useState<string>();
  const [currentUserMembershipType, setCurrentUserMembershipType] =
    useState<string>();
  const [characterData, setCharacterData] = useState();
  const [itemInstances, setItemInstances] = useState();

  useEffect(() => {
    const fetchUsers = setTimeout(async () => {
      if (username.length === 0) {
        setSearchResults([]);
        return;
      }
      try {
        const response = await fetch(`${URL}/api/bungie-user-search`, {
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
        <SearchComponent
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
    setCurrentUserMembershipId(membershipId);
    setCurrentUserMembershipType(membershipType.toString());
  };

  const fetchCharacters = async () => {
    const response = await fetch(`${URL}/api/get-bungie-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': `${process.env.REACT_APP_DESTINY_API_KEY}`,
      },
      body: JSON.stringify({
        membershipType: currentUserMembershipType,
        membershipId: currentUserMembershipId,
      }),
    });
    const data = await response.json();
    return [data.characterEquipment.data, data.itemComponents.instances.data];
  };

  useEffect(() => {
    if (currentUserMembershipId && currentUserMembershipType) {
      (async () => {
        try {
          const [characterData, itemInstances] = await fetchCharacters();
          setCharacterData(characterData);
          setItemInstances(itemInstances);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [currentUserMembershipId, currentUserMembershipType]);

  const searchResultsContainer = (
    <div className="max-h-60 w-60 overflow-auto bg-slate-900 border border-slate-500">
      {searchResultComponents}
    </div>
  );
  
  return (
    <main className="flex min-h-screen flex-col items-center pt-24">
      <DestinyInventoryItemDefinitionContextProvider>
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
        {characterData && itemInstances ? (
          <CharacterContainer
            characterData={characterData}
            itemInstances={itemInstances}
          />
        ) : null}
      </DestinyInventoryItemDefinitionContextProvider>
    </main>
  );
}
