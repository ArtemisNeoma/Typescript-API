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
import { container } from 'tsyringe';
import { IRepositoryUser } from '@interfaces/domain/user/repository';
import getCep from '@services/cep/getCep';
import { tokens } from './tokens';

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

container.register<ICreateUserService>(
  tokens.CreateUserService,
  CreateUserService,
);
container.register<IListUserService>(tokens.ListUserService, ListUserService);

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
