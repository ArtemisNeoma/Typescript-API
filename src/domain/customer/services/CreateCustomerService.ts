import { ICreateCustomerService } from '@interfaces/domain/customer/services/service';
import { inject, injectable } from 'tsyringe';
import { ICustomerValidator } from '@interfaces/domain/customer/services/validation';
import {
  IRepositoryCustomer,
  ICustomer,
} from '@interfaces/domain/customer/repository';
import { tokens } from '@di/tokens';
import { Document, InsertOneResult } from 'mongodb';
@injectable()
export default class CreateCustomerService implements ICreateCustomerService {
  constructor(
    @inject(tokens.CustomerRepository)
    private repository: IRepositoryCustomer,
    @inject(tokens.CustomerValidator)
    private validator: ICustomerValidator,
  ) {}

  public async create(user: ICustomer): Promise<InsertOneResult<Document>> {
    await this.validator.validate(user);
    return await this.repository.create(user);
  }
}
