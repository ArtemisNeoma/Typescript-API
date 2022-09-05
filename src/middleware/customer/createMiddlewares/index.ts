import { MiddlewareArray } from '@interfaces/middleware';
import { createMiddleware } from './createMiddleware';

const createCustomerMiddlewares: MiddlewareArray = [createMiddleware];
export default createCustomerMiddlewares;
