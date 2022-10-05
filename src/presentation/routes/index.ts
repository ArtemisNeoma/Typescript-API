import { Router } from 'express';
import DocsRouter from '@presentation/http/DocsRouter';
import { inject, injectable } from 'tsyringe';
import { tokens } from '@di/tokens';
import CustomerRouter from './CustomerRouter';

@injectable()
export default class MainRouter {
  private router: Router = Router();
  constructor(
    @inject(tokens.CustomerRouter) private customerRouter: CustomerRouter,
    @inject(tokens.DocsRouter) private docsRouter: DocsRouter,
  ) {}
  public setup() {
    this.router = this.router.use('/customer', this.customerRouter.setup());
    this.router = this.router.use('/docs', this.docsRouter.setup());
    return this.router;
  }
}
