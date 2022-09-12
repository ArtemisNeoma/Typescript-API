import {
  DeleteResult,
  Document,
  InsertOneResult,
  UpdateResult,
  WithId,
} from 'mongodb';
import { ICustomer } from './customer/repository';

export type IVariableDatabase = Map<number, ICustomer>;
export type ReadAllType = WithId<Document>[];
export interface IEndPointsRepository {
  create(entity: object): Promise<InsertOneResult<Document>>;
  read(id: number): Promise<WithId<Document> | null>;
  update(id: number, newEntity: object): Promise<UpdateResult>;
  readAll(): Promise<WithId<Document>[]>;
  delete(id: number): Promise<DeleteResult>;
}
