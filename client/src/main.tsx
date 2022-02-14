import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { SocketsProvider } from './utils/useSockets';
import { GameStatesProvider } from './utils/useGameState';

ReactDOM.render(
  <React.StrictMode>
    <GameStatesProvider>
      <SocketsProvider>
        <App />
      </SocketsProvider>
    </GameStatesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
