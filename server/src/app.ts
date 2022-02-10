import config from 'config';
import logger from "./utils/logger";

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { sockets } from './sockets';

const port = config.get<number>('port');
const origin = config.get<string>('origin');

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: origin,
  },
});

httpServer.listen(port, () => {
  logger.info(`listening on: ${port}`);

  sockets({ io });
});
