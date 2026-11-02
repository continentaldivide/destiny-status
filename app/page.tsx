'use client';

import { useState, useEffect } from 'react';
import Nav from './_components/Nav';
import InstructionsModal from './_components/InstructionsModal';
import CharacterContainer from './_components/CharacterContainer';
import SearchResultContainer from './_components/SearchResultContainer';
import useGenerateSearchResults from './_hooks/useGenerateSearchResults';
import { GetBasicProfileResponseType } from './_interfaces/BungieAPI/GetBasicProfileResponse.interface';
import { PlayerContextProvider } from './_context/PlayerContext';
import { trackSearch } from './_lib/analytics';

export default function Home() {
  const [fetchingData, setFetchingData] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<
    GetBasicProfileResponseType[]
  >([]);
  const [currentUserData, setCurrentUserData] = useState({
    membershipId: '',
    membershipType: 0,
    characterCount: 0,
  });

  useEffect(() => {
    const modalViewedStatus = localStorage.getItem('new-user-instructions');
    if (modalViewedStatus !== 'viewed') {
      setModalIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (username.length === 0) {
      return;
    }
    const getSearchResults = async () => {
      setFetchingData(true);
      try {
        const { results, failed } = await useGenerateSearchResults(username);
        setSearchResults(results);
        if (failed) {
          trackSearch(username, 'error', 0);
        } else {
          trackSearch(
            username,
            results.length > 0 ? 'results' : 'no_results',
            results.length
          );
        }
      } catch (error) {
        // a failed profile lookup lands here; without this the page would stay
        // on the loading skeleton with the search button disabled
        console.log(error);
        setSearchResults([]);
        trackSearch(username, 'error', 0);
      } finally {
        setFetchingData(false);
      }
    };
    getSearchResults();
    setCurrentUserData({
      membershipId: '',
      membershipType: 0,
      characterCount: 0,
    });
  }, [username]);

  const handleModalClose = () => {
    setModalIsOpen(false);
    localStorage.setItem('new-user-instructions', 'viewed');
  };

  return (
    <>
      <Nav
        fetchingData={fetchingData}
        setUsername={setUsername}
        handleInfoClick={() => setModalIsOpen(true)}
      />
      <main className="flex min-h-screen flex-col items-center pt-24">
        {modalIsOpen && <InstructionsModal onClose={handleModalClose} />}
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
            <CharacterContainer
              characterCount={currentUserData.characterCount}
              fetchingData={fetchingData}
            />
          )}
        </PlayerContextProvider>
      </main>
    </>
  );
}
