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
    it("Should return empty database when userRepository's database is empty", () => {
      expect(userRepository.readAll()).toBe(userRepository.database);
    });

    it("Should return filled database when userRepository's database is filled", () => {
      mockDatabaseGet.mockReturnValue(
        new Map<number, ICustomer>()
          .set(0, mockCustomer)
          .set(1, mockCustomer)
          .set(2, mockCustomer),
      );
      expect(userRepository.readAll()).toBe(userRepository.database);
    });
  });

  describe('update', () => {
    it('Should return updated user when updating user', () => {
      mockDatabaseGet.mockReturnValue(
        new Map<number, ICustomer>().set(0, mockCustomer),
      );
      expect(userRepository.update(0, mockCustomerUpdated)).toBe(
        mockCustomerUpdated,
      );
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
