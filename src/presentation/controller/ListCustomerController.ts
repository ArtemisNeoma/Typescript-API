import StatusError from '@util/error';
import { NextFunction, Request, Response } from 'express';
import { IListCustomerService } from '@interfaces/domain/customer/services/service';
import { IEndPointsController } from 'interfaces/presentation/controller';
import { inject, injectable } from 'tsyringe';
import { tokens } from '@di/tokens';

@injectable()
export default class ListCustomerController implements IEndPointsController {
  constructor(
    @inject(tokens.ListCustomerService) private service: IListCustomerService,
  ) {}

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const info = await this.service.readAll();
      return res.json({ message: info }).status(200);
    } catch (error) {
      next(new StatusError(500, `${error}`));
    }
  }
}
