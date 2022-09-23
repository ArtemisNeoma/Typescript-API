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
  describe('readAll', () => {
    it('Should return the all of customers array as an object when running readAll', async () => {
      expect(await listCustomerService.readAll()).toEqual({
        0: mockEntry,
        1: mockEntry,
      });
    });
    it('Should throw error when CustomerRepository fails', async () => {
      spyRepository.mockRejectedValue(new Error());
      try {
        await listCustomerService.readAll();
      } catch (err) {
        expect(err).toEqual(new Error('Failed to readAll database'));
      }
    });
  });
});
