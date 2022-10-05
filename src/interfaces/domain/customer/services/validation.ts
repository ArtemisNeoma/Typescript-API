import { IVariableDatabase } from '../../repository';
import { ICustomer } from '../repository';
export interface ICustomerValidator {
  validate(user: ICustomer, database: IVariableDatabase): Promise<void>;
}
