import { ICustomer } from '@interfaces/domain/customer/repository';
import StatusError from '@util/error';
import { Request, Response } from 'express';
import { AnySchema } from 'joi';
import { createMiddleware } from './createMiddleware';
import userCreateSchema from './schema';

const req = { body: {} } as Request;
const res = {} as Response;
const next = jest.fn();
const mockSchema = {
  validateAsync: jest.fn(),
} as unknown as AnySchema;

beforeEach(() => {
  (mockSchema.validateAsync as jest.Mock).mockClear();
});
describe('createMiddleware', () => {
  it("Should run next without parameters when validation doesn't throw", async () => {
    (mockSchema.validateAsync as jest.Mock).mockResolvedValue({} as ICustomer);
    const middleware = createMiddleware(mockSchema);
    await middleware(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('Should run next with throwed Error when validation fails', async () => {
    const validationError = new Error();
    (mockSchema.validateAsync as jest.Mock).mockRejectedValue(validationError);
    const middleware = createMiddleware(mockSchema);
    await middleware(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new StatusError(422, `${validationError}`),
    );
  });
});
