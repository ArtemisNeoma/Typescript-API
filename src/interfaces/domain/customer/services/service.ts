import { Document, WithId } from 'mongodb';
import { ICustomer } from '../repository';

export interface IDatabaseObject {
  [k: string]: ICustomer;
}

export interface ICreateCustomerService {
  create(user: ICustomer): Promise<ICustomer>;
}

export interface IListCustomerService {
  readAll(): Promise<{ [x: number]: WithId<Document> }>;
}
