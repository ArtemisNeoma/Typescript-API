import { RouteMiddleware } from '@interfaces/middleware';
import StatusError from '@util/error';
import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'joi';

export const createMiddleware: RouteMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateBody = await schema.validateAsync(req.body);
      req.body = validateBody;
      next();
    } catch (error) {
      next(new StatusError(422, `${error}`));
    }
  };
