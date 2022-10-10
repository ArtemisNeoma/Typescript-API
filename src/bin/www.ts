import 'reflect-metadata';
import '@di/index';
import { config } from 'dotenv';
import { onListening, onError } from './serverInfo';
import app from 'index';
import container from '@di/index';
import { tokens } from '@di/tokens';
import { IDatabaseClient } from '@interfaces/infrastructure';
import { serverLogger } from '@util/logger';

config({ path: '/config/config.env' });
const port = process.env.PORT || 3000;
const mongoClient = container.resolve<IDatabaseClient>(tokens.DatabaseClient);
mongoClient.connect().then(
  () => {
    serverLogger.log('info', `Connected to MongoDB database`);
  },
  () => {
    serverLogger.log('error', `Failed to connect to MongoDB database`);
    throw new Error('Failed to connect to MongoDB');
  },
);

app
  .listen(port)
  .on('error', (error: NodeJS.ErrnoException): never => onError(error, port))
  .on('listening', (): void => onListening(port));
