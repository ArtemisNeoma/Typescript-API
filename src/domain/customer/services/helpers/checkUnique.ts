import { IVariableDatabase } from '@interfaces/domain/repository';
import { ICustomer } from '@interfaces/domain/customer/repository';

export const checkUnique = (
  field: string,
  fieldName: keyof ICustomer,
  database: IVariableDatabase,
) => {
  const usersArray = Array.from(database.values());
  let result = true;
  usersArray.map((value: ICustomer) => {
    if (value[fieldName] === field) {
      result = false;
    }
  });
  return result;
};

export default checkUnique;
