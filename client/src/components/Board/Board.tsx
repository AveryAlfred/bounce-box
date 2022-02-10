import { SyntheticEvent, useState } from 'react';

import { GameWorld } from './GameWorld';
import { useSockets } from '../../utils/useSockets';

import { Stage } from 'react-pixi-fiber';
import styled from 'styled-components';
import { Block } from './Block';

export const Board = () => {
  const { socket, roomId } = useSockets();

  const [world, setWorld] = useState({
    boxes: [],
    walls: [],
  });

  socket.on('update state', (world) => {
    setWorld(world);
  });

  let stageProps = {
    height: 200,
    width: 400,
    backgroundColor: 0xb3b0b0,
    antialias: true,
    autoDensity: true,
  };

  const handleClick = (e: SyntheticEvent) => {
    const click = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    socket.emit('click', { ...click });
    console.log(click);
  };

  return (
    <Page>
      <div>
        <RoomId>{roomId}</RoomId>

        <Game onClick={handleClick}>
          <Stage options={stageProps}>
            {Object.keys(world).map((key) => {
              let counter = 0;
              return world[key].map((el) => (
                <Block type={key} key={counter++} shape={el} />
              ));
            })}
          </Stage>
        </Game>
      </div>
    </Page>
  );
};

const Page = styled.div`
  background-color: #747171;
  height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
  user-select: none;
`;

const RoomId = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Game = styled.div`
  cursor: pointer;
`;
