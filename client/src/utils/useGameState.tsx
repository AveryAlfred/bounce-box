import { createContext, useContext, useState } from 'react';

export enum GameStates {
  Login,
  Message,
  Start,
}

interface Context {
  view: GameStates;
  setView: Function;
}

const GameStatesContext = createContext<Context>({
  view: GameStates.Login,
  setView: () => false,
});

export const GameStatesProvider = (props: any) => {
  const [view, setView] = useState(GameStates.Login);

  return (
    <GameStatesContext.Provider
      value={{
        view: view,
        setView: setView,
      }}
      {...props}
    />
  );
};

export const useGameState = () => useContext(GameStatesContext);
