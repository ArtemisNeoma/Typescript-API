import { IDatabaseClient } from '@interfaces/infrastructure';
import { serverLogger } from '@util/logger';
import { Db, MongoClient } from 'mongodb';
import { injectable } from 'tsyringe';

@injectable()
export default class MongoDBClient implements IDatabaseClient {
  private uri: string = process.env.url || 'mongodb://localhost:27017';
  private client: MongoClient = new MongoClient(this.uri);
  private database = this.client.db('typescript_api');

  constructor() {
    this.connect().then(
      () => {
        serverLogger.log('info', 'Connected to MongoDB database');
      },
      () => {
        serverLogger.log('error', 'Failed to connect to MongoDB database');
      },
    );
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }
  public async close(): Promise<void> {
    await this.client.close();
  }
  public getInstance(): Db {
    return this.database;
  }
}
