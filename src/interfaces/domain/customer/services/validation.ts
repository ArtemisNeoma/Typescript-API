import { ICustomer } from '../repository';
export interface ICustomerValidator {
  validate(user: ICustomer): Promise<void>;
}
