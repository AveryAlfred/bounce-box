import { customAlphabet } from 'nanoid';
import logger from './utils/logger';

import { Server, Socket } from 'socket.io';
import { createGame } from './engine/createGame';

// All events listened to and emitted
const EVENTS = {
  connection: 'connection',
  CLIENT: {
    CREATE_ROOM: 'CREATE_ROOM',
    SEND_ROOM_MESSAGE: 'SEND_ROOM_MESSAGE',
    JOIN_ROOM: 'JOIN_ROOM',
  },
  SERVER: {
    ROOMS: 'ROOMS',
    JOINED_ROOM: 'JOINED_ROOM',
    ROOM_MESSAGE: 'ROOM_MESSAGE',
  },
};

const rooms: Record<string, { name: string }> = {};

export const sockets = ({ io }: { io: Server }) => {
  logger.info(`Sockets enabled`);

  io.on(EVENTS.connection, (socket: Socket) => {
    // Initial connection
    logger.info(`User connected ${socket.id}`);
    socket.emit(EVENTS.SERVER.ROOMS, rooms);

    // Create room
    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      let roomId: string;
      if (!roomName) {
        let nanoid = customAlphabet('xyz', 3);

        roomId = nanoid();
        nanoid = customAlphabet('xyz', 3);

        roomName = nanoid();
      }
      rooms[roomId] = {
        name: roomName,
      };

      logger.info(
        `User ${socket.id} has created ID:${roomId} NAME:${roomName}`
      );
      // Broadcast event saying there's a new room
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
      // Emit back to the room creator with all the rooms
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      // Emit event back to the room creator saying they have joined
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);

      createGame(io, socket, roomId);
    });

    // Join room
    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
      logger.info(`User ${socket.id} has joined ${roomId}`);
      socket.join(roomId);
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });

    // Send room message
    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, username }) => {
        const date = new Date();

        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          message,
          username,
          time: `${date.getHours()}:${date.getMinutes()}`,
        });
      }
    );
  });
};
