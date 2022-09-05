import AbstractRepository from '@domain/AbstractRepository';
import {
  IRepositoryCustomer,
  ICustomer,
} from '@interfaces/domain/customer/repository';
import { IVariableDatabase } from 'interfaces/domain/repository';
import { injectable } from 'tsyringe';

@injectable()
export default class CustomerRepository
  extends AbstractRepository
  implements IRepositoryCustomer
{
  public getNewIndex(): number {
    const idArray = Array.from(this.database.keys());
    if (idArray.length === 0) {
      return 0;
    }
    return Math.max(...idArray) + 1;
  }

  public create(entity: ICustomer): ICustomer | undefined {
    const newId = this.getNewIndex();
    this.database.set(newId, entity);
    return this.database.get(newId);
  }

  public read(id: number): undefined | ICustomer {
    return this.database.get(id);
  }

  public readAll(): IVariableDatabase {
    return this.database;
  }

  public update(id: number, newEntity: ICustomer): ICustomer | undefined {
    this.database.set(id, newEntity);
    return this.database.get(id);
  }

  public delete(id: number): boolean {
    return this.database.delete(id);
  }
}
