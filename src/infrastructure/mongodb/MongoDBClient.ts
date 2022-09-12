import { IDatabaseClient } from '@interfaces/infrastructure';
import { Db, MongoClient } from 'mongodb';
import { injectable } from 'tsyringe';

@injectable()
export default class MongoDBClient implements IDatabaseClient {
  private uri: string = process.env.url || 'mongodb://localhost:27017';
  private client: MongoClient = new MongoClient(this.uri);
  private database = this.client.db('typescript_api');

  constructor() {
    this.connect();
  }

  public async connect(): Promise<any> {
    await this.client.connect();
  }
  public async close(): Promise<any> {
    await this.client.close();
  }
  public getInstance(): Db {
    return this.database;
  }
}
