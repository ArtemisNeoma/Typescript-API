import { MiddlewareArray } from '@interfaces/middleware';
import { createMiddleware } from './createMiddleware';
import userCreateSchema from './schema';

const createCustomerMiddlewares: MiddlewareArray = [
  createMiddleware(userCreateSchema),
];
export default createCustomerMiddlewares;
