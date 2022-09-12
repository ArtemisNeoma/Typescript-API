import {
  DeleteResult,
  Document,
  FindCursor,
  InsertOneResult,
  UpdateResult,
  WithId,
} from 'mongodb';
import { ICustomer } from './customer/repository';

export type IVariableDatabase = Map<number, ICustomer>;

export interface IEndPointsRepository {
  create(entity: object): Promise<InsertOneResult<Document>>;
  read(id: number): Promise<WithId<Document> | null>;
  update(id: number, newEntity: object): Promise<UpdateResult>;
  readAll(): FindCursor<WithId<Document>>;
  delete(id: number): Promise<DeleteResult>;
}
