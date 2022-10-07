import { Db } from 'mongodb';

export interface IDatabaseClient {
  connect(): Promise<any>;
  close(): Promise<any>;
  getInstance(): Db;
}
