import { tokens } from '@di/tokens';
import { IRepositoryCustomer } from '@interfaces/domain/customer/repository';
import { IListCustomerService } from '@interfaces/domain/customer/services/service';
import { inject, injectable } from 'tsyringe';
@injectable()
export default class ListCustomerService implements IListCustomerService {
  readingError: Error = new Error('Failed to readAll database');
  constructor(
    @inject(tokens.CustomerRepository)
    private repository: IRepositoryCustomer,
  ) {}

  public async readAll() {
    try {
      const allCustomers = await this.repository.readAll();
      return { ...allCustomers };
    } catch (err) {
      throw this.readingError;
    }
  }
}
