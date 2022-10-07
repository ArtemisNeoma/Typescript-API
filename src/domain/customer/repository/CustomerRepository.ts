import { tokens } from '@di/tokens';
import {
  IRepositoryCustomer,
  ICustomer,
} from '@interfaces/domain/customer/repository';
import { IDatabaseClient } from '@interfaces/infrastructure';
import { Collection, Document, ObjectId, UpdateFilter } from 'mongodb';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CustomerRepository implements IRepositoryCustomer {
  private collection: Collection<Document>;
  constructor(
    @inject(tokens.DatabaseClient)
    public dbClient: IDatabaseClient,
  ) {
    this.collection = dbClient.getInstance().collection('Customer');
    this.collection.createIndex({ email: 1 }, { unique: true });
    this.collection.createIndex({ cpf: 1 }, { unique: true });
  }

  public async create(entity: ICustomer) {
    return this.collection.insertOne(entity);
  }

  public async read(_id: ObjectId) {
    return this.collection.findOne({ _id });
  }

  public async readAll() {
    return this.collection.find().toArray();
  }

  public async update(_id: ObjectId, update: UpdateFilter<Document>) {
    return this.collection.updateOne({ _id }, update);
  }

  public async delete(_id: ObjectId) {
    return this.collection.deleteOne({ _id });
  }
}
