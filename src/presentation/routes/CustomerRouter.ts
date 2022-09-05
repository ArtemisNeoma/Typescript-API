import { tokens } from '@di/tokens';
import { ControllerAdapterType, MiddlewareArray } from '@interfaces/middleware';
import { IEndPointsController } from '@interfaces/presentation/controller';
import { Router } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CustomerRouter {
  private router = Router();
  constructor(
    @inject(tokens.CreateCustomerController)
    private createCustomerController: IEndPointsController,
    @inject(tokens.ListCustomerController)
    private listCustomerController: IEndPointsController,
    @inject(tokens.CreateCustomerMiddlewares)
    private createMiddlewares: MiddlewareArray,
    @inject(tokens.ControllerAdapter)
    private controllerAdapter: ControllerAdapterType,
  ) {}

  public setup(): Router {
    this.router.post(
      '/',
      this.createMiddlewares,
      this.controllerAdapter(this.createCustomerController),
    );
    this.router.get('/', this.controllerAdapter(this.listCustomerController));
    return this.router;
  }
}
