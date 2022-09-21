import container from '@di/index';
import { tokens } from '@di/tokens';
import { ICustomer } from '@interfaces/domain/customer/repository';
import { ICreateCustomerService } from '@interfaces/domain/customer/services/service';
import { IDatabaseClient } from '@interfaces/infrastructure';
import { Document, InsertOneResult, ObjectId } from 'mongodb';
import CustomerRepository from '../repository/CustomerRepository';
import CreateCustomerService from './CreateCustomerService';
import CustomerValidator from './helpers/CustomerValidator';

const mockCustomer: ICustomer = {} as ICustomer;
const mongoClient = container.resolve<IDatabaseClient>(tokens.DatabaseClient);
const successCreateReturn: InsertOneResult<Document> = {
  acknowledged: true,
  insertedId: new ObjectId('aaaaaaaaaaaa'),
};
const createCustomerService = container.resolve<ICreateCustomerService>(
  tokens.CreateCustomerService,
);
const spyRepository = jest
  .spyOn(CustomerRepository.prototype, 'create')
  .mockResolvedValue(successCreateReturn);
const spyValidator = jest
  .spyOn(CustomerValidator.prototype, 'validate')
  .mockResolvedValue();

beforeEach(async () => {
  await mongoClient.getInstance().collection('Customer').deleteMany({});
});
afterAll(async () => {
  await mongoClient.close();
});

describe('CreateCustomerService', () => {
  describe('create', () => {
    it('Should resolve acknowledged and insertedId when sending a new correct user', async () => {
      expect(await createCustomerService.create(mockCustomer)).toEqual(
        successCreateReturn,
      );
    });
    it('Should reject with error when validation fails', async () => {
      spyValidator.mockImplementationOnce(async () => {
        throw new Error();
      });
      try {
        await createCustomerService.create(mockCustomer);
      } catch (err) {
        expect(err).toEqual(new Error());
      }
    });
    it('Should reject with error when repository fails', async () => {
      spyRepository.mockImplementation(async () => {
        throw new Error();
      });
      try {
        await createCustomerService.create(mockCustomer);
      } catch (err) {
        expect(err).toEqual(new Error());
      }
    });
  });
});
