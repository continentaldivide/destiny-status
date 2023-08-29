import { createContext } from 'react';

const DestinyInventoryItemDefinitionContext = createContext();

export function DestinyInventoryItemDefinitionContextProvider() {
  return (
    <DestinyInventoryItemDefinitionContext.Provider
      value={'placeholder'}
    ></DestinyInventoryItemDefinitionContext.Provider>
  );
}

export default DestinyInventoryItemDefinitionContext;
