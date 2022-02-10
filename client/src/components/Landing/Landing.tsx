import {
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useGameState, GameStates } from '../../utils/useGameState';
import { EVENTS } from '../../utils/events.types';
import { useSockets } from '../../utils/useSockets';
import styled, { keyframes } from 'styled-components';

import { IoMdCheckmarkCircle } from 'react-icons/io';

export const Landing = () => {
  const { setUsername, socket, roomId, rooms } = useSockets();
  const { setView } = useGameState();
  const [viewRooms, setViewRooms] = useState(false);
  const usernameRef = useRef(null);

  const handleMakeGame = () => {
    const userName = usernameRef.current.value;
    if (!userName) {
      return;
    }
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, {});

    setUsername(userName);
    localStorage.setItem('username', userName);

    setView(() => GameStates.Start);
  };

  const handleJoinGame = (roomName) => {
    const userName = usernameRef.current.value;
    if (!userName || !roomName) {
      return;
    }
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, roomName);

    setUsername(userName);
    localStorage.setItem('username', userName);

    setView(() => GameStates.Start);
  };

  const handleToggleGameList = () => {
    setViewRooms(() => (viewRooms ? false : true));
  };

  return (
    <Page>
      <Title>BounceBox</Title>

      <Main>
        <PlayerDetails>
          <InputLabel> Name</InputLabel>
          <InputName
            ref={usernameRef}
            id="name"
            type="text"
            autoComplete="off"
          />
        </PlayerDetails>

        <ButtonGroup>
          <Button onClick={handleMakeGame}> Make </Button>
          <Button onClick={handleToggleGameList}> Join</Button>
        </ButtonGroup>

        {viewRooms && (
          <RoomDetails>
            {Object.keys(rooms).map((key) => (
              <Room
                key={key}
                title={`Join ${key}`}
                onClick={() => handleJoinGame(key)}
              >
                {key}
              </Room>
            ))}
          </RoomDetails>
        )}
      </Main>
    </Page>
  );
};

const Page = styled.div`
  display: grid;
  grid-template-rows: 1fr 9fr;
  place-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #acacac;
  user-select: none;
`;

const Title = styled.div`
  place-self: start;
  padding: 0.5rem 3rem;
  font-size: 2rem;
  font-weight: 600;
  color: #2b2a2a;
`;

const Main = styled.div`
  position: relative;
  display: grid;
`;

const PlayerDetails = styled.div`
  width: 30%;
  padding-bottom: 1rem;
`;
const InputName = styled.input`
  all: unset;
  background-color: #ffffff60;
  outline: 2.5px solid #3b3a3a;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  border-radius: 0.35rem;
  padding: 0.25rem 0;
`;

const InputLabel = styled.div`
  position: absolute;
  top: -1rem;
  left: -1rem;
  background-color: #3b3a3a;
  padding: 0.15rem 1rem;
  color: white;
  border-radius: 0.35rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  width: 8rem;
  background-color: #4d4b4b;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const RoomDetails = styled.div`
  display: grid;
  gap: 0.15rem;
  position: relative;
  padding: 1rem;
`;

const Room = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  place-self: center;

  padding: 0.25rem 0;
  width: 30%;
  background-color: #636060;
  color: #cccccc;
  cursor: pointer;
`;
