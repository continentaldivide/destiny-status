import { useState, useEffect, createContext, useContext } from 'react';

export const PlayerContext = createContext('player context');

export function PlayerContextProvider(props: any) {
  return (
    <PlayerContext.Provider value={'player context'}>
      {props.children}
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
