import { IDatabaseClient } from '@interfaces/infrastructure';
import { Db, MongoClient } from 'mongodb';
import { injectable } from 'tsyringe';

@injectable()
export default class MongoDBClient implements IDatabaseClient {
  public uri: string = process.env.url || 'mongodb://localhost:27017';
  private client: MongoClient = new MongoClient(this.uri);
  private database = this.client.db('typescript_api');

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
