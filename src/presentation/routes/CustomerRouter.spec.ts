import request from 'supertest';
import app from '../../index';
import CustomerRepository from '@domain/customer/repository/CustomerRepository';
import axios from 'axios';
import {
  mCpfEqualCustomer,
  mCpfInvalidCustomer,
  mCpfRepeatedCustomer,
  mEmailRepeatedCustomer,
  mockDatabase,
  mockValidCustomer,
  mPCodeInvalidCustomer,
} from './mocks/CustomerRouter.mock';
import { ICustomer } from '@interfaces/domain/customer/repository';
import { Document, InsertOneResult, ObjectId } from 'mongodb';
import container from '@di/index';
import { IDatabaseClient } from '@interfaces/infrastructure';
import { tokens } from '@di/tokens';

const mongoClient = container.resolve<IDatabaseClient>(tokens.DatabaseClient);
const customerCollection = mongoClient.getInstance().collection('Customer');

const spyRepositoryReadAll = jest.spyOn(
  CustomerRepository.prototype,
  'readAll',
);

beforeEach(async () => {
  await mongoClient.getInstance().collection('Customer').deleteMany({});
});

afterAll(async () => {
  await mongoClient.close();
});

describe('Route /customer', () => {
  describe('GET /customer', () => {
    const id = new ObjectId('aaaaaaaaaaaa');
    const expectedResults: Record<string, object | string> = {
      listJson: {
        0: {
          _id: mockValidCustomer._id !== undefined ? mockValidCustomer._id : '',
          email: mEmailRepeatedCustomer.email,
          cpf: mCpfRepeatedCustomer.cpf,
        },
      },
      getError: 'Error: Failed to readAll database',
    };

    it('Should return all customers when reading works correctly', async () => {
      await customerCollection.insertOne({
        _id: id,
        email: mEmailRepeatedCustomer.email,
        cpf: mCpfRepeatedCustomer.cpf,
      });
      const res = await request(app).get('/customer');
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(200);
      expect(res.body.message).toEqual(expectedResults.listJson);
    });

    it('Should return reading error when readAll fails', async () => {
      spyRepositoryReadAll.mockRejectedValue(new Error());
      const res = await request(app).get('/customer');
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual(expectedResults.getError);
    });
  });

  describe('POST /customer', () => {
    const expectedResults: Record<string, string | object> = {
      newCustomer: {
        ...mockValidCustomer,
        cpf: '12345678909',
        cellphone: '47991234567',
        birthdate: new Date('2000-01-01'),
        postal_code: '89010203',
      },
      repeatedCpf: '19087282052',
      repeatedEmail: 'repeated@repeated.com',
      equalCpf: '11111111111',
      invalidCpf: '10897799900',
      invalidPostalCode: '01010101',
    };

    const missingCases: (keyof ICustomer)[] = [
      'address',
      'postal_code',
      'city',
      'country',
      'whatsapp',
      'email_sms',
      'birthdate',
      'cellphone',
      'cpf',
      'email_confirmation',
      'email',
      'full_name',
    ];

    it('Should respond with sanitized user json when creating valid user', async () => {
      const res = await request(app).post('/customer').send(mockValidCustomer);
      const insertedId: string = res.body.message.insertedId;
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(201);
      expect(await customerCollection.findOne({ _id: insertedId })).toEqual(
        expectedResults.newCustomer,
      );
    });

    it('Should respond with error when cpf already exists', async () => {
      await customerCollection.insertOne({ cpf: mCpfRepeatedCustomer.cpf });
      const res = await request(app)
        .post('/customer')
        .send(mCpfRepeatedCustomer);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `MongoServerError: E11000 duplicate key error collection: typescript_api.Customer index: cpf_1 dup key: { cpf: \"${expectedResults.repeatedCpf}" }`,
      );
    });

    it('Should respond with error when email already exists', async () => {
      await customerCollection.insertOne({
        email: mEmailRepeatedCustomer.email,
      });
      const res = await request(app)
        .post('/customer')
        .send(mEmailRepeatedCustomer);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `MongoServerError: E11000 duplicate key error collection: typescript_api.Customer index: email_1 dup key: { email: \"${expectedResults.repeatedEmail}" }`,
      );
    });

    it('Should respond with error when user cpf is composed only with one number', async () => {
      const res = await request(app).post('/customer').send(mCpfEqualCustomer);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `Error: CPF ${expectedResults.equalCpf} is invalid`,
      );
    });

    it('Should respond with error when user cpf is invalid', async () => {
      const res = await request(app)
        .post('/customer')
        .send(mCpfInvalidCustomer);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `Error: CPF ${expectedResults.invalidCpf} is invalid`,
      );
    });

    it('Should respond with error when user postal code is invalid', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
      const res = await request(app)
        .post('/customer')
        .send(mPCodeInvalidCustomer);
      expect(res).not.toBeUndefined();
      expect(res.status).toBe(422);
      expect(res.body.error).toEqual(
        `Error: Postal Code ${expectedResults.invalidPostalCode} is invalid`,
      );
    });

    it.each(missingCases)(
      'Should respond with error when %p is missing in new user',
      async (firstParam) => {
        (mockValidCustomer[firstParam] as unknown) = undefined;
        const res = await request(app)
          .post('/customer')
          .send(mockValidCustomer);
        expect(res).not.toBeUndefined();
        expect(res.status).toBe(422);
      },
    );
  });
});
