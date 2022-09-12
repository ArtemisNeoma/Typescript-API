import { tokens } from '@di/tokens';
import {
  IRepositoryCustomer,
  ICustomer,
} from '@interfaces/domain/customer/repository';
import { IDatabaseClient } from '@interfaces/infrastructure';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CustomerRepository implements IRepositoryCustomer {
  constructor(
    @inject(tokens.DatabaseClient)
    private dbClient: IDatabaseClient,
  ) {}

  public async create(entity: ICustomer) {
    return await this.dbClient
      .getInstance()
      .collection('Customer')
      .insertOne(entity);
  }

  public async read(id: number) {
    return await this.dbClient
      .getInstance()
      .collection('Customer')
      .findOne({ _id: id });
  }

  public async readAll() {
    return await this.dbClient
      .getInstance()
      .collection('Customer')
      .find()
      .toArray();
  }

  public async update(id: number, newEntity: ICustomer) {
    return await this.dbClient
      .getInstance()
      .collection('Customer')
      .updateOne({ _id: id }, newEntity);
  }

  public async delete(id: number) {
    return await this.dbClient
      .getInstance()
      .collection('Customer')
      .deleteOne({ _id: id });
  }
}
