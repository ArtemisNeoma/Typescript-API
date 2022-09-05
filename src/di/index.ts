import CustomerRepository from '@domain/customer/repository/CustomerRepository';
import CreateCustomerService from '@domain/customer/services/CreateCustomerService';
import checkUnique from '@domain/customer/services/helpers/checkUnique';
import CustomerValidator from '@domain/customer/services/helpers/CustomerValidator';
import ListCustomerService from '@domain/customer/services/ListCustomerService';
import {
  ICreateCustomerService,
  IListCustomerService,
} from '@interfaces/domain/customer/services/service';
import { ICustomerValidator } from '@interfaces/domain/customer/services/validation';
import { ControllerAdapterType, MiddlewareArray } from '@interfaces/middleware';
import { IEndPointsController } from '@interfaces/presentation/controller';
import controllerAdapter from '@middleware/controllerAdapter';
import createCustomerMiddlewares from '@middleware/customer/createMiddlewares';
import isCpfValid from '@util/validation/Cpf/isCpfValid';
import { Router } from 'express';
import CreateCustomerController from '@presentation/controller/CreateCustomerController';
import ListCustomerController from '@presentation/controller/ListCustomerController';
import { container } from 'tsyringe';
import { IRepositoryCustomer } from '@interfaces/domain/customer/repository';
import getCep from '@services/cep/getCep';
import { tokens } from './tokens';
import { DocsService } from '@infrastructure/docs/DocsService';
import { DocsController } from '@presentation/http/controllers/DocsController';
import CustomerRouter from '@presentation/routes/CustomerRouter';
import DocsRouter from '@presentation/http/DocsRouter';
import MainRouter from '@presentation/routes';

container.registerSingleton<MainRouter>(tokens.MainRouter, MainRouter);

container.registerSingleton<CustomerRouter>(
  tokens.CustomerRouter,
  CustomerRouter,
);

container.registerSingleton<DocsRouter>(tokens.DocsRouter, DocsRouter);

container.register<Router>(tokens.FrameworkRouter, { useValue: Router() });
container.registerSingleton<IEndPointsController>(
  tokens.CreateCustomerController,
  CreateCustomerController,
);
container.registerSingleton<IEndPointsController>(
  tokens.ListCustomerController,
  ListCustomerController,
);
container.register<MiddlewareArray>(tokens.CreateCustomerMiddlewares, {
  useValue: createCustomerMiddlewares,
});
container.register<ControllerAdapterType>(tokens.ControllerAdapter, {
  useValue: controllerAdapter,
});

container.registerSingleton<DocsController>(
  tokens.DocsController,
  DocsController,
);

container.registerSingleton<ICreateCustomerService>(
  tokens.CreateCustomerService,
  CreateCustomerService,
);
container.registerSingleton<IListCustomerService>(
  tokens.ListCustomerService,
  ListCustomerService,
);
container.registerSingleton<DocsService>(tokens.DocsService, DocsService);

container.registerSingleton<IRepositoryCustomer>(
  tokens.CustomerRepository,
  CustomerRepository,
);
container.registerSingleton<ICustomerValidator>(
  tokens.CustomerValidator,
  CustomerValidator,
);

container.register(tokens.getCep, {
  useValue: getCep,
});
container.register(tokens.isCpfValid, {
  useValue: isCpfValid,
});
container.register(tokens.checkUnique, {
  useValue: checkUnique,
});

export default container;
