import { ICustomer } from '../repository';

export interface IDatabaseObject {
  [k: string]: ICustomer;
}

export interface ICreateCustomerService {
  create(user: ICustomer): Promise<ICustomer>;
}

export interface IListCustomerService {
  readAll(): IDatabaseObject;
}
