import { Document, InsertOneResult, WithId } from 'mongodb';
import { ICustomer } from '../repository';

export interface IDatabaseObject {
  [k: string]: ICustomer;
}

export interface ICreateCustomerService {
  create(user: ICustomer): Promise<InsertOneResult<Document>>;
}

export interface IListCustomerService {
  readAll(): Promise<{ [x: number]: WithId<Document> }>;
}
