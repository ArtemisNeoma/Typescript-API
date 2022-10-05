import { ICreateCustomerService } from '@interfaces/domain/customer/services/service';
import { inject, injectable } from 'tsyringe';
import { ICustomerValidator } from '@interfaces/domain/customer/services/validation';
import {
  IRepositoryCustomer,
  ICustomer,
} from '@interfaces/domain/customer/repository';
import { tokens } from '@di/tokens';
@injectable()
export default class CreateCustomerService implements ICreateCustomerService {
  constructor(
    @inject(tokens.CustomerRepository)
    private repository: IRepositoryCustomer,
    @inject(tokens.CustomerValidator)
    private validator: ICustomerValidator,
  ) {}

  public async create(user: ICustomer): Promise<ICustomer> {
    await this.validator.validate(user, this.repository.readAll());
    this.repository.create(user);
    return user;
  }
}
