import { injectable } from 'tsyringe';
import SwaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import { join } from 'path';

@injectable()
export class DocsService {
  public initDocs = SwaggerUI.serve;
  public makeDocs = SwaggerUI.setup(
    YAML.load(join(__dirname, '..', '..', '..', 'docs', 'index.yaml')),
  );
}
