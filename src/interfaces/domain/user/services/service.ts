import { ICustomer } from '../repository';

export interface IDatabaseObject {
  [k: string]: ICustomer;
}

export interface ICreateUserService {
  create(user: ICustomer): Promise<ICustomer>;
}

export interface IListUserService {
  readAll(): IDatabaseObject;
}
