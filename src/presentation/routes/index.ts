import { Router } from 'express';
import UserRouter from './UserRouter';
import DocsRouter from '@presentation/http/DocsRouter';
import { inject, injectable } from 'tsyringe';
import { tokens } from '@di/tokens';

@injectable()
export default class MainRouter {
  private router: Router = Router();
  constructor(
    @inject(tokens.UserRouter) private userRouter: UserRouter,
    @inject(tokens.DocsRouter) private docsRouter: DocsRouter,
  ) {}
  public setup() {
    this.router = this.router.use('/customer', this.userRouter.setup());
    this.router = this.router.use('/docs', this.docsRouter.setup());
    return this.router;
  }
}
