import UserRepository from '@domain/user/repository/UserRepository';
import CreateUserService from '@domain/user/services/CreateUserService';
import checkUnique from '@domain/user/services/helpers/checkUnique';
import UserValidator from '@domain/user/services/helpers/UserValidator';
import ListUserService from '@domain/user/services/ListUserService';
import {
  ICreateUserService,
  IListUserService,
} from '@interfaces/domain/user/services/service';
import { IUserValidator } from '@interfaces/domain/user/services/validation';
import { ControllerAdapterType, MiddlewareArray } from '@interfaces/middleware';
import { IEndPointsController } from '@interfaces/presentation/controller';
import controllerAdapter from '@middleware/controllerAdapter';
import createUserMiddlewares from '@middleware/user/createMiddlewares';
import isCpfValid from '@util/validation/Cpf/isCpfValid';
import { Router } from 'express';
import CreateUserController from '@presentation/controller/CreateUserController';
import ListUserController from '@presentation/controller/ListUserController';
import { container, Lifecycle } from 'tsyringe';
import { IRepositoryUser } from '@interfaces/domain/user/repository';
import getCep from '@services/cep/getCep';
import { tokens } from './tokens';
import { DocsService } from '@infrastructure/docs/DocsService';
import { DocsController } from '@presentation/http/controllers/DocsController';
import UserRouter from '@presentation/routes/UserRouter';
import DocsRouter from '@presentation/http/DocsRouter';
import MainRouter from '@presentation/routes';

container.registerSingleton<MainRouter>(tokens.MainRouter, MainRouter);

container.registerSingleton<UserRouter>(tokens.UserRouter, UserRouter);

container.registerSingleton<DocsRouter>(tokens.DocsRouter, DocsRouter);

container.register<Router>(tokens.FrameworkRouter, { useValue: Router() });
container.registerSingleton<IEndPointsController>(
  tokens.CreateUserController,
  CreateUserController,
);
container.registerSingleton<IEndPointsController>(
  tokens.ListUserController,
  ListUserController,
);
container.register<MiddlewareArray>(tokens.CreateUserMiddlewares, {
  useValue: createUserMiddlewares,
});
container.register<ControllerAdapterType>(tokens.ControllerAdapter, {
  useValue: controllerAdapter,
});

container.registerSingleton<DocsController>(
  tokens.DocsController,
  DocsController,
);

container.registerSingleton<ICreateUserService>(
  tokens.CreateUserService,
  CreateUserService,
);
container.registerSingleton<IListUserService>(
  tokens.ListUserService,
  ListUserService,
);
container.registerSingleton<DocsService>(tokens.DocsService, DocsService);

container.registerSingleton<IRepositoryUser>(
  tokens.UserRepository,
  UserRepository,
);
container.registerSingleton<IUserValidator>(
  tokens.UserValidator,
  UserValidator,
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
