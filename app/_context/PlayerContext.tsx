import { useState, useEffect, createContext, useContext } from 'react';
import PlayerContextType from '../_interfaces/PlayerContext.interface';

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

type Props = {
  currentUserData: {
    membershipId: string;
    membershipType: number;
  };
  children: React.ReactNode;
};

export function PlayerContextProvider({ currentUserData, children }: Props) {
  const [fetchedPlayerData, setFetchedPlayerData] = useState<PlayerContextType>(
    {
      characterEquipment: {},
      itemInstances: {},
    }
  );

  const fetchCharacters = async () => {
    const { membershipType, membershipId } = currentUserData;
    const response = await fetch(`api/get-bungie-profile`, {
      method: 'POST',
      body: JSON.stringify({
        membershipType,
        membershipId,
      }),
    });
    const { characterEquipment, itemComponents } = await response.json();
    return {
      characterEquipment: characterEquipment.data,
      itemInstances: itemComponents.instances.data,
    };
  };

  useEffect(() => {
    if (currentUserData.membershipId === '') {
      return;
    } else {
      (async () => {
        try {
          const { characterEquipment, itemInstances } = await fetchCharacters();
          setFetchedPlayerData({ characterEquipment, itemInstances });
        } catch (error) {
          console.log(error);
        }
      })();
    }
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
