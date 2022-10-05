import { ICustomer } from './customer/repository';

export type IVariableDatabase = Map<number, ICustomer>;

export interface IEndPointsRepository {
  create(entity: object): object | undefined;
  read(id: number): undefined | object;
  readAll(): IVariableDatabase;
  update(id: number, newEntity: object): object | undefined;
  delete(id: number): void;
}
