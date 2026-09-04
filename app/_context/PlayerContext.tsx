import { useState, useEffect, createContext, useContext } from 'react';
import PlayerContextType from '../_interfaces/PlayerContext.interface';

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

type Props = {
  currentUserData: {
    membershipId: string;
    membershipType: number;
  };
  setFetchingData: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const emptyPlayerData: PlayerContextType = {
  characterEquipment: {},
  itemInstances: {},
  itemPerks: {},
  definitions: {
    DestinyInventoryItemDefinition: {},
    DestinyDamageTypeDefinition: {},
    DestinySandboxPerkDefinition: {},
    DestinyStatDefinition: {},
  },
  hasError: false,
};

export function PlayerContextProvider({
  currentUserData,
  setFetchingData,
  children,
}: Props) {
  const [fetchedPlayerData, setFetchedPlayerData] =
    useState<PlayerContextType>(emptyPlayerData);

  // The response arrives ready to render: equipment is already filtered and
  // carries the manifest definitions for every hash it references.
  const fetchCharacters = async () => {
    const { membershipType, membershipId } = currentUserData;
    const response = await fetch(`api/get-full-profile`, {
      method: 'POST',
      body: JSON.stringify({
        membershipType,
        membershipId,
      }),
    });
    if (!response.ok) {
      throw new Error(`get-full-profile responded ${response.status}`);
    }
    return await response.json();
  };

  useEffect(() => {
    if (currentUserData.membershipId === '') {
      setFetchedPlayerData(emptyPlayerData);
      return;
    }
    (async () => {
      setFetchingData(true);
      try {
        const { characterEquipment, itemInstances, itemPerks, definitions } =
          await fetchCharacters();
        setFetchedPlayerData({
          characterEquipment,
          itemInstances,
          itemPerks,
          definitions,
          hasError: false,
        });
      } catch (error) {
        console.error(error);
        // Surfaces ErrorMessage rather than leaving the user on a loading
        // skeleton that never resolves.
        setFetchedPlayerData({ ...emptyPlayerData, hasError: true });
      } finally {
        setFetchingData(false);
      }
    })();
  }, [currentUserData]);

  return (
    <PlayerContext.Provider value={fetchedPlayerData}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
