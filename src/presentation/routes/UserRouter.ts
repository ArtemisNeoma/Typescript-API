import { tokens } from '@di/tokens';
import { ControllerAdapterType, MiddlewareArray } from '@interfaces/middleware';
import { IEndPointsController } from '@interfaces/presentation/controller';
import { Router } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class UserRouter {
  constructor(
    @inject(tokens.FrameworkRouter) private router: Router,
    @inject(tokens.CreateUserController)
    private createUserController: IEndPointsController,
    @inject(tokens.ListUserController)
    private listUserController: IEndPointsController,
    @inject(tokens.CreateUserMiddlewares)
    private createMiddlewares: MiddlewareArray,
    @inject(tokens.ControllerAdapter)
    private controllerAdapter: ControllerAdapterType,
  ) {}

  public setup(): Router {
    this.router.post(
      '/',
      this.createMiddlewares,
      this.controllerAdapter(this.createUserController),
    );
    this.router.get('/', this.controllerAdapter(this.listUserController));
    return this.router;
  }
}
