import container from '@di/index';
import { ICustomer } from '@interfaces/domain/customer/repository';
import CustomerRepository from './CustomerRepository';

process.env.url = process.env.MONGO_URL;
const userRepository = container.resolve(CustomerRepository);
const mockCustomer = {} as ICustomer;
const mockDatabaseArr = [
  {} as ICustomer,
  { cpf: 1, email: '1' } as unknown as ICustomer,
  { cpf: 2, email: '2' } as unknown as ICustomer,
];
const mockCustomerUpdated = { email: 'test@test.com' } as unknown as ICustomer;

beforeEach(async () => {
  await userRepository.dbClient
    .getInstance()
    .collection('Customer')
    .deleteMany({});
});

afterAll(async () => {
  await userRepository.dbClient.close();
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
    it('Should return true when deleting an entry that exists', () => {
      mockDatabaseGet.mockReturnValue(
        new Map<number, ICustomer>().set(0, mockCustomer),
      );
      expect(userRepository.delete(0)).toBe(true);
    });
    it("Should return false when deleting an entry that doesn't exists", () => {
      expect(userRepository.delete(0)).toBe(false);
    });
  });
});
