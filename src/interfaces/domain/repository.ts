import {
  DeleteResult,
  Document,
  InsertOneResult,
  ObjectId,
  UpdateResult,
  WithId,
} from 'mongodb';
import { ICustomer } from './customer/repository';

export type IVariableDatabase = Map<number, ICustomer>;
export type ReadAllType = WithId<Document>[];
export interface IEndPointsRepository {
  create(entity: object): Promise<InsertOneResult<Document>>;
  read(id: ObjectId): Promise<WithId<Document> | null>;
  update(id: number, newEntity: object): Promise<UpdateResult>;
  readAll(): Promise<ReadAllType>;
  delete(id: number): Promise<DeleteResult>;
}
