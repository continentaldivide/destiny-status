import { useState, useEffect, createContext, useContext } from 'react';

export const PlayerContext = createContext<string | undefined>(undefined);

export function PlayerContextProvider({
  characterData,
  itemInstances,
  children,
}: any) {
  const PlayerContextData = {
    characterData,
    itemInstances,
  };
  console.log(PlayerContextData.characterData);

  return (
    <PlayerContext.Provider value={'player context'}>
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
