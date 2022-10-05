import { IVariableDatabase } from '@interfaces/domain/repository';
import { ICustomer } from '@interfaces/domain/customer/repository';
import checkUnique from './checkUnique';

const mockDatabase: IVariableDatabase = new Map<number, ICustomer>();
const mockCustomer: ICustomer = { email: 'test@test.com.br' } as ICustomer;

describe('checkUnique', () => {
  describe('checkUnique', () => {
    it('Should return true when checking a unique item', () => {
      expect(checkUnique(mockCustomer.email, 'email', mockDatabase)).toBe(true);
    });

    it('Should return false when checking an already existing item', () => {
      mockDatabase.set(0, mockCustomer);
      expect(checkUnique(mockCustomer.email, 'email', mockDatabase)).toBe(false);
    });
  });
});
