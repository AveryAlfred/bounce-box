import Matter from 'matter-js';
import { gameOptions } from './gameOptions';
import { Server, Socket } from 'socket.io';

export const createGame = (io: Server, socket: Socket, roomId: string) => {

  const options = gameOptions();
  const toVertices = (e) => e.vertices.map(({ x, y }) => ({ x, y }));

  const engine = Matter.Engine.create();
  Matter.World.add(engine.world, [].concat(...Object.values(options.entities)));

  // Update loop
  setInterval(() => {
    Matter.Engine.update(engine, options.frameRate);
    io.emit('update state', {
      boxes: options.entities.boxes.map(toVertices),
      walls: options.entities.walls.map(toVertices),
    });
  }, options.frameRate);

  socket.on('click', (coordinates) => {
    options.entities.boxes.forEach((box) => {
      const force = 0.01;
      const deltaVector = Matter.Vector.sub(box.position, coordinates);
      const normalizedDelta = Matter.Vector.normalise(deltaVector);
      const forceVector = Matter.Vector.mult(normalizedDelta, force);
      Matter.Body.applyForce(box, box.position, forceVector);
    });
  });

};
