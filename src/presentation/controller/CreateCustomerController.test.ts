import container from '@di/index';
import { NextFunction, Request, Response } from 'express';
import StatusError from '@util/error';
import { ICustomer } from '@interfaces/domain/customer/repository';
import CreateCustomerService from '@domain/customer/services/CreateCustomerService';
import CreateCustomerController from './CreateCustomerController';
import { Document, InsertOneResult } from 'mongodb';
import { tokens } from '@di/tokens';
import { IDatabaseClient } from '@interfaces/infrastructure';

const mongoClient = container.resolve<IDatabaseClient>(tokens.DatabaseClient);

const mockReturn = {} as InsertOneResult<Document>;
const req = {} as Request;
const res = {} as Response;
const next = jest.fn() as NextFunction;
const spyCreateCustomerController = jest.spyOn(
  CreateCustomerService.prototype,
  'create',
);

beforeAll(() => {
  req.body = {} as ICustomer;
  res.status = jest.fn();
  res.json = jest.fn();
});

beforeEach(async () => {
  await mongoClient.getInstance().collection('Customer').deleteMany({});
});

afterAll(async () => {
  mongoClient.close();
});

describe('CreateCustomerController', () => {
  describe('handle', () => {
    const createCustomerController = container.resolve(
      CreateCustomerController,
    );
    it('Should create user when all fields are correct', async () => {
      spyCreateCustomerController.mockResolvedValue(mockReturn);
      await createCustomerController.handle(req, res, next);
      expect(res.status).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('Should run next with error when user is incorrect', async () => {
      const error = new Error();
      spyCreateCustomerController.mockRejectedValue(error);
      await createCustomerController.handle(req, res, next);
      expect(next).toBeCalled();
      expect(next).toHaveBeenCalledWith(new StatusError(422, `${error}`));
    });
  });
});
