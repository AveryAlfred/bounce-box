import logger, { pino } from 'pino';
import dayjs from 'dayjs';

const transport = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true },
});

const log = logger(
  {
    base: {
      pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format('DD-MM-YY || HH:MM')}"`,
  },
  transport
);

export default log;
