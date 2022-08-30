import { DocsService } from '@infrastructure/docs/DocsService';
import { injectable, inject } from 'tsyringe';

@injectable()
export class DocsController {
  constructor(
    @inject('DocsService')
    private docsService: DocsService,
  ) {}

  public initDocs = this.docsService.initDocs;
  public makeDocs = this.docsService.makeDocs;
}
