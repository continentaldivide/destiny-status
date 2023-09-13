import { useState, useEffect, createContext, useContext } from 'react';

export const PlayerContext = createContext<any>(undefined);

type Props = {
  currentUserData: {
    membershipId: string;
    membershipType: number;
  };
  children: React.ReactNode;
};

export function PlayerContextProvider({ currentUserData, children }: Props) {
  const [playerContextData, setPlayerContextData] = useState({
    characterData: '',
    itemInstances: 0,
  });

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
      characterData: characterEquipment.data,
      itemInstances: itemComponents.instances.data,
    };
  };

  useEffect(() => {
    if (currentUserData.membershipId === '') {
      return;
    } else {
      (async () => {
        try {
          console.log(currentUserData);
          const { characterData, itemInstances } = await fetchCharacters();
          setPlayerContextData({ characterData, itemInstances });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [currentUserData]);

  return (
    <PlayerContext.Provider value={playerContextData}>
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
