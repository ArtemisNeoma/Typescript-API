import container from '@di/index';
import { tokens } from '@di/tokens';
import {
  ICustomer,
  IRepositoryCustomer,
} from '@interfaces/domain/customer/repository';
import { IDatabaseClient } from '@interfaces/infrastructure';
import { ObjectId } from 'mongodb';

const userRepository = container.resolve<IRepositoryCustomer>(
  tokens.CustomerRepository,
);
const mongoClient = container.resolve<IDatabaseClient>(tokens.DatabaseClient);
const mockCustomer = {} as ICustomer;
const mockDatabaseArr = [
  {} as ICustomer,
  { cpf: 1, email: '1' } as unknown as ICustomer,
  { cpf: 2, email: '2' } as unknown as ICustomer,
];
const mockCustomerUpdated = { email: 'test@test.com' } as unknown as ICustomer;

beforeEach(async () => {
  await mongoClient.getInstance().collection('Customer').deleteMany({});
});

afterAll(async () => {
  await mongoClient.close();
});

describe('CustomerRepository', () => {
  describe('create', () => {
    it('Should add new user with the id returned when running the create method', async () => {
      const newUser = await userRepository.create(mockCustomer);
      expect(newUser.acknowledged).toBe(true);
      expect(await userRepository.read(newUser.insertedId)).toEqual(
        mockCustomer,
      );
    });
  });

  describe('read', () => {
    it('Should return the matching indexed user when index exists', async () => {
      const { insertedId } = await userRepository.create(mockCustomer);
      expect(await userRepository.read(insertedId)).toEqual(mockCustomer);
    });
    it('Should return null when getting an absent index', async () => {
      expect(await userRepository.read(new ObjectId('aaaaaaaaaaaa'))).toEqual(
        null,
      );
    });
  });
  describe('readAll', () => {
    it("Should return empty array when userRepository's database is empty", async () => {
      expect(await userRepository.readAll()).toEqual([]);
    });
    it('Should return array of customers when database has customers', async () => {
      await userRepository.create(mockDatabaseArr[0]);
      await userRepository.create(mockDatabaseArr[1]);
      await userRepository.create(mockDatabaseArr[2]);
      expect(await userRepository.readAll()).toEqual(mockDatabaseArr);
    });
  });

  describe('update', () => {
    it('Should modify informed user when updating user', async () => {
      const { insertedId } = await userRepository.create(mockCustomer);
      const { acknowledged } = await userRepository.update(insertedId, {
        $set: { ...mockCustomerUpdated },
      });
      expect(acknowledged).toBe(true);
      expect(await userRepository.read(insertedId)).toEqual({
        ...{ _id: insertedId },
        ...mockCustomerUpdated,
      });
    });
  });

  describe('delete', () => {
    it('Should return a deletedCount of 1 when deleting an entry that exists', async () => {
      const { insertedId } = await userRepository.create(mockCustomer);
      const { acknowledged, deletedCount } = await userRepository.delete(
        insertedId,
      );
      expect(acknowledged).toBe(true);
      expect(deletedCount).toBe(1);
    });
    it("Should return a deletedCount of 0 when deleting an entry that doesn't exists", async () => {
      const { acknowledged, deletedCount } = await userRepository.delete(
        new ObjectId('aaaaaaaaaaaa'),
      );
      expect(acknowledged).toBe(true);
      expect(deletedCount).toBe(0);
    });
  });
});
