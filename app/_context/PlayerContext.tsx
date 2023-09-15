import { useState, useEffect, createContext, useContext } from 'react';
import PlayerContextType from '../_interfaces/PlayerContext.interface';
import { GetProfileResponseType } from '../_interfaces/BungieAPI/GetProfileResponse.interface';
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
    const response = await fetch(`api/get-bungie-profile`, {
      method: 'POST',
      body: JSON.stringify({
        membershipType,
        membershipId,
      }),
    });
    const { characterEquipment, itemComponents }: GetProfileResponseType =
      await response.json();
    return {
      characterEquipment: characterEquipment.data,
      itemInstances: itemComponents.instances.data,
    };
  };

  // item.transferStatus 3 gets rid of each piece of 'equipment' that can't be transferred between characters: subclass, clan banner, emblem, emotes, and finishers.  ref https://bungie-net.github.io/multi/schema_Destiny-TransferStatuses.html#schema_Destiny-TransferStatuses
  const sliceEquipment = (characterEquipment: {
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
      return;
    } else {
      (async () => {
        try {
          const { characterEquipment, itemInstances } = await fetchCharacters();
          sliceEquipment(characterEquipment);
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
