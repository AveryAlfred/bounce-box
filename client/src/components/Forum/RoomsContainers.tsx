import styled from 'styled-components';
import { useRef } from 'react';
import { EVENTS } from '../../utils/events.types';
import { useSockets } from '../../utils/useSockets';

export const RoomsContainer = () => {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  const handleCreateRoom = () => {
    //get the room name
    const roomName = newRoomRef.current.value || '';

    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    newRoomRef.current.value = '';
  };

  const handleJoinRoom = (key) => {
    if (key === roomId) return;
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  };

  return (
    <Wrapper>
      <CreateRoomWrapper>
        <input ref={newRoomRef} placeholder="Room name" />
        <button onClick={handleCreateRoom}>CREATE ROOM</button>
      </CreateRoomWrapper>

      <RoomList>
        {Object.keys(rooms).map((key) => {
          return (
            <div key={key}>
              <button
                disabled={key === roomId}
                title={`Join ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
              >
                {rooms[key].name}
              </button>
            </div>
          );
        })}
      </RoomList>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  width: 250px;
  background-color: rgba(256, 256, 256, 0.8);
  height: 100vh;
  padding: 1rem;
  border-right: solid 2px #333;
`;
const CreateRoomWrapper = styled.div`
  padding-bottom: 1rem;
  border-bottom: solid 1px #ccc;

  button,
  input {
    width: 100%;
  }

  input {
    margin-bottom: 0.5rem;
  }
`;

const RoomList = styled.ul`
  list-style: none;
  padding: 0;

  button {
    width: 100%;
    margin-bottom: 0.5rem;
    background-color: transparent;
    color: black;
    padding: 0 1rem;
    display: flex;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
    cursor: default;
  }
  button span {
    flex: 1;
    text-align: left;
  }
`;
