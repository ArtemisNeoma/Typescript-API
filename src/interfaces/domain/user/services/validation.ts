import { IVariableDatabase } from '../../repository';
import { ICustomer } from '../repository';
export interface IUserValidator {
  validate(user: ICustomer, database: IVariableDatabase): Promise<void>;
}
