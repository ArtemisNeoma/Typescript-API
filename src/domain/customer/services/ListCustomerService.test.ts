import container from '@di/index';
import { IVariableDatabase } from '@interfaces/domain/repository';
import { ICustomer } from '@interfaces/domain/customer/repository';
import CustomerRepository from '../repository/CustomerRepository';
import ListCustomerService from './ListCustomerService';

const mockCustomer = {} as ICustomer;
const databaseMock: IVariableDatabase = new Map<number, ICustomer>().set(
  0,
  mockCustomer,
);
const listCustomerService = container.resolve(ListCustomerService);

describe('ListCustomerService', () => {
  describe('listAll', () => {
    it('Should return json of users when getting and converting works', () => {
      jest
        .spyOn(CustomerRepository.prototype, 'readAll')
        .mockReturnValue(databaseMock);
      expect(listCustomerService.readAll()).toEqual(
        Object.fromEntries(databaseMock),
      );
    });

    it('Should throw error when CustomerRepository fails', () => {
      jest
        .spyOn(CustomerRepository.prototype, 'readAll')
        .mockImplementation(() => {
          throw new Error();
        });
      expect(() => listCustomerService.readAll()).toThrow();
    });
  });
});
