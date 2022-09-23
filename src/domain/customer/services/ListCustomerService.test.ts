import container from '@di/index';
import { tokens } from '@di/tokens';
import { IListCustomerService } from '@interfaces/domain/customer/services/service';
import { IDatabaseClient } from '@interfaces/infrastructure';
import { Document, WithId } from 'mongodb';
import CustomerRepository from '../repository/CustomerRepository';

const mongoClient = container.resolve<IDatabaseClient>(tokens.DatabaseClient);
const listCustomerService = container.resolve<IListCustomerService>(
  tokens.ListCustomerService,
);
const mockEntry = {} as WithId<Document>;
const spyRepository = jest
  .spyOn(CustomerRepository.prototype, 'readAll')
  .mockResolvedValue([mockEntry, mockEntry]);
beforeEach(async () => {
  await mongoClient.getInstance().collection('Customer').deleteMany({});
});
afterAll(async () => {
  await mongoClient.close();
});

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
