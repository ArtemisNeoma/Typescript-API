import StatusError from '@util/error';
import { NextFunction, Request, Response } from 'express';
import { ICreateCustomerService } from '@interfaces/domain/customer/services/service';
import { IEndPointsController } from 'interfaces/presentation/controller';
import { inject, injectable } from 'tsyringe';
import { tokens } from '@di/tokens';

@injectable()
export default class CreateCustomerController implements IEndPointsController {
  constructor(
    @inject(tokens.CreateCustomerService)
    private service: ICreateCustomerService,
  ) {}

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const newCustomer = await this.service.create(req.body);
      return res.status(201).json({ message: newCustomer });
    } catch (error) {
      next(new StatusError(422, `${error}`));
    }
  }
}
