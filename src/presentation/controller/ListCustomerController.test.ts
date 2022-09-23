import container from '@di/index';
import { NextFunction, Request, Response } from 'express';
import StatusError from '@util/error';
import { IDatabaseObject } from '@interfaces/domain/customer/services/service';
import ListCustomerService from '@domain/customer/services/ListCustomerService';
import ListCustomerController from './ListCustomerController';

const databaseMock = {} as IDatabaseObject;
const req = {} as Request;
const res = {} as Response;
const next = jest.fn() as NextFunction;
const error = new Error();
const spyListCustomerService = jest.spyOn(
  ListCustomerService.prototype,
  'readAll',
);

beforeAll(() => {
  req.body = databaseMock;
  res.status = jest.fn().mockImplementation(() => res);
  res.json = jest.fn().mockImplementation(() => res);
});

describe('ListCustomerController', () => {
  describe('handle', () => {
    const listCustomerController = container.resolve(ListCustomerController);
    it('Should send users json with status code 200 when services succeds', async () => {
      spyListCustomerService.mockReturnValue(databaseMock);
      await listCustomerController.handle(req, res, next);
      expect(res.json).toBeCalledWith({ message: databaseMock });
      expect(res.status).toBeCalledWith(200);
    });
    it('Should run next with error when service fails', async () => {
      spyListCustomerService.mockImplementation(async () => {
        throw error;
      });
      await listCustomerController.handle(req, res, next);
      expect(next).toHaveBeenCalledWith(new StatusError(500, `${error}`));
    });
  });
});
