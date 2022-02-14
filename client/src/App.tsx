import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

import { useGameState, GameStates } from './utils/useGameState';

import { Landing } from './components/Landing/Landing';
import { Board } from './components/Board/Board';
import { Forum } from './components/Forum/Forum';

export const App = () => {
  const { view } = useGameState();

  return (
    <>
      <GlobalStyle />
      <div onContextMenu={(e) => e.preventDefault()}>
        {view === GameStates.Login && <Landing />}
        {view === GameStates.Message && <Forum />}
        {view === GameStates.Start && <Board />}
      </div>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Courier, monospace;
  }

  * {
    box-sizing: border-box;
    padding: 0; 
    margin: 0;
  }
  `;
