import { useState, useEffect, createContext, useContext } from 'react';
import PlayerContextType from '../_interfaces/PlayerContext.interface';
import { GetFullProfileResponseType } from '../_interfaces/BungieAPI/GetFullProfileResponse.interface';
import CharacterEquipmentType from '../_interfaces/CharacterEquipment.interface';

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
    const response = await fetch(`api/get-full-profile`, {
      method: 'POST',
      body: JSON.stringify({
        membershipType,
        membershipId,
      }),
    });
    const { characterEquipment, itemComponents }: GetFullProfileResponseType =
      await response.json();
    return {
      characterEquipment: characterEquipment.data,
      itemInstances: itemComponents.instances.data,
    };
  };

  // item.transferStatus 3 gets rid of each piece of 'equipment' that can't be transferred between characters: subclass, clan banner, emblem, emotes, and finishers.  ref https://bungie-net.github.io/multi/schema_Destiny-TransferStatuses.html
  const filterEquipment = (characterEquipment: {
    [key: string]: CharacterEquipmentType;
  }) => {
    for (const character in characterEquipment) {
      characterEquipment[character].items = characterEquipment[
        character
      ].items.filter((item) => {
        return item.transferStatus !== 3;
      });
    }
  };

  useEffect(() => {
    if (currentUserData.membershipId === '') {
      setFetchedPlayerData({
        characterEquipment: {},
        itemInstances: {},
      });
      return;
    } else {
      (async () => {
        try {
          const { characterEquipment, itemInstances } = await fetchCharacters();
          filterEquipment(characterEquipment);
          setFetchedPlayerData({
            characterEquipment,
            itemInstances,
          });
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
