import { IVariableDatabase } from '@interfaces/domain/repository';
import { ICustomerValidator } from '@interfaces/domain/customer/services/validation';
import { ICustomer } from '@interfaces/domain/customer/repository';
import { inject, injectable } from 'tsyringe';
import { tokens } from '@di/tokens';

@injectable()
export default class CustomerValidator implements ICustomerValidator {
  readonly _getCep: (value: string) => Promise<boolean>;
  readonly _isCpfValid: (cpf: string) => boolean;
  readonly _checkUnique: (
    value: string,
    fieldName: keyof ICustomer,
    database: IVariableDatabase,
  ) => boolean;
  constructor(
    @inject(tokens.getCep)
    getCep: (value: string) => Promise<boolean>,
    @inject(tokens.isCpfValid)
    isCpfValid: (cpf: string) => boolean,
    @inject(tokens.checkUnique)
    checkUnique: (
      value: string,
      fieldName: keyof ICustomer,
      database: IVariableDatabase,
    ) => boolean,
  ) {
    this._getCep = getCep;
    this._isCpfValid = isCpfValid;
    this._checkUnique = checkUnique;
  }

  public async validate(user: ICustomer, database: IVariableDatabase) {
    if (!(await this._getCep(user.postal_code)))
      throw Error(`Postal Code ${user.postal_code} is invalid`);
    if (!this._isCpfValid(user.cpf)) throw Error(`CPF ${user.cpf} is invalid`);
    if (!this._checkUnique(user.email, 'email', database))
      throw Error(`Email ${user.email} already exists`);
    if (!this._checkUnique(user.cpf, 'cpf', database))
      throw Error(`CPF ${user.cpf} already exists`);
  }
}
