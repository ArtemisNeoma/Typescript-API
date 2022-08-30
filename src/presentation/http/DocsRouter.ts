import { Router } from 'express';
import { inject, injectable } from 'tsyringe';
import { DocsController } from './controllers/DocsController';

@injectable()
export default class DocsRouter {
  constructor(
    @inject('FrameworkRouter') private router: Router,
    @inject('DocsController') private docsController: DocsController,
  ) {}

  public setup(): Router {
    this.router.use('/', this.docsController.initDocs);
    this.router.get('/', this.docsController.makeDocs);
    return this.router;
  }
}
