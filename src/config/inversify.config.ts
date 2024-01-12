import { Container } from 'inversify';

// Infra Imports
import HttpErrorInfra from '../infrastructure/handlers/http-erro/http.error.infra';
import ValidatePipeInfra from '../infrastructure/handlers/pipes/validate-pipe.infra';
import {
  CRYPTO_INFRA_TYPE,
  ICryptoInfra,
} from '../infrastructure/crypto/Icrypto.infra';
import CryptoInfra from '../infrastructure/crypto/implementation/crypto.infra';
import {
  ILoggerInfra,
  LOGGER_INFRA_TYPE,
} from '../infrastructure/logger/interfaces';
import LoggerInfra from '../infrastructure/logger/logger.infra';

// Use Cases/Controllers Imports
import {
  IRegisterUserUseCase,
  REGISTER_USER_USE_CASE_TYPE,
} from '../apps/user/use-cases/register-user/interfaces';
import RegisterUserUseCase from '../apps/user/use-cases/register-user/register-user.use-case';
import RegisterUserController from '../apps/user/use-cases/register-user/register-user.controller';
import {
  IUserLoginUseCase,
  USER_LOGIN_USE_CASE_TYPE,
} from '../apps/user/use-cases/user-login/interfaces';
import UserLoginUseCase from '../apps/user/use-cases/user-login/login.use-case';
import UserLoginController from '../apps/user/use-cases/user-login/login.controller';
import HealthCheckController from '../apps/health-check/health-check.controller';
import {
  ICreateProducerUseCase,
  CREATE_PRODUCER_USE_CASE_TYPE,
} from '../apps/producer/use-cases/create-producer/interfaces';
import CreateProducerUseCase from '../apps/producer/use-cases/create-producer/create-producer.use-case';
import CreateProducerController from '../apps/producer/use-cases/create-producer/create-producer.controller';
import {
  IListProducerUseCase,
  LIST_PRODUCER_USE_CASE_TYPE,
} from '../apps/producer/use-cases/list-producer/interfaces';
import ListProducerUseCase from '../apps/producer/use-cases/list-producer/list-producer.use-case';
import ListProducerController from '../apps/producer/use-cases/list-producer/list-producer.controller';
import {
  IEditProducerUseCase,
  EDIT_PRODUCER_USE_CASE_TYPE,
} from '../apps/producer/use-cases/edit-producer/interfaces';
import EditProducerUseCase from '../apps/producer/use-cases/edit-producer/edit-producer.use-case';
import EditProducerController from '../apps/producer/use-cases/edit-producer/edit-producer.controller';
import {
  IDeleteProducerUseCase,
  DELETE_PRODUCER_USE_CASE_TYPE,
} from '../apps/producer/use-cases/delete-producer/interfaces';
import DeleteProducerUseCase from '../apps/producer/use-cases/delete-producer/delete-producer.use-case';
import DeleteProducerController from '../apps/producer/use-cases/delete-producer/delete-producer.controller';
import {
  ICreateFarmUseCase,
  CREATE_FARM_USE_CASE_TYPE,
} from '../apps/farm/use-cases/create-farm/interfaces';
import CreateFarmUseCase from '../apps/farm/use-cases/create-farm/create-farm.use-case';
import CreateFarmController from '../apps/farm/use-cases/create-farm/create-farm.controller';
import {
  ICreateCropUseCase,
  CREATE_CROP_USE_CASE_TYPE,
} from '../apps/farm/use-cases/create-crop/interfaces';
import CreateCropUseCase from '../apps/farm/use-cases/create-crop/create-crop.use-case';
import CreateCropController from '../apps/farm/use-cases/create-crop/create-crop.controller';

import {
  IListFarmsUseCase,
  LIST_FARMS_USE_CASE_TYPE,
} from '../apps/farm/use-cases/list-farms/interfaces';
import ListFarmsUseCase from '../apps/farm/use-cases/list-farms/list-farms.use-case';
import ListFarmsController from '../apps/farm/use-cases/list-farms/list-farms.controller';

// Database Imports
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../shared/gateways/database/user/Iuser.repository';
import UserRepository from '../shared/gateways/database/user/implementations/user.repository';
import {
  IProducerRepository,
  PRODUCER_REPOSITORY_TYPE,
} from '../shared/gateways/database/producer/Iproducer.repository';
import ProducerRepository from '../shared/gateways/database/producer/implementations/producer.repository';
import {
  IFarmRepository,
  FARM_REPOSITORY_TYPE,
} from '../shared/gateways/database/farm/Ifarm.repository';
import FarmRepository from '../shared/gateways/database/farm/implementations/farm.repository';
import {
  ICropTypeRepository,
  CROP_TYPE_REPOSITORY_TYPE,
} from '../shared/gateways/database/crop-type/Icrop-type.repository';
import CropTypeRepository from '../shared/gateways/database/crop-type/implementations/crop-type.repository';
import {
  IPlantedCropRepository,
  PLANTED_CROP_REPOSITORY_TYPE,
} from '../shared/gateways/database/planted-crop/Iplanted-crop.repository';
import PlantedCropRepository from '../shared/gateways/database/planted-crop/implementations/planted-crop.repository';

// Middleware Imports
import JwtAuthMiddleware from '../shared/middlewares/jwt-auth/jwt-auth.middleware';

const container = new Container();

// Infra Resolvers
container.bind<HttpErrorInfra>(HttpErrorInfra).toSelf();
container.bind<ValidatePipeInfra>(ValidatePipeInfra).toSelf();
container.bind<ICryptoInfra>(CRYPTO_INFRA_TYPE).to(CryptoInfra);
container.bind<ILoggerInfra>(LOGGER_INFRA_TYPE).to(LoggerInfra);

// Use Case/Controller Resolvers
container
  .bind<IRegisterUserUseCase>(REGISTER_USER_USE_CASE_TYPE)
  .to(RegisterUserUseCase);
container.bind<RegisterUserController>(RegisterUserController).toSelf();
container
  .bind<IUserLoginUseCase>(USER_LOGIN_USE_CASE_TYPE)
  .to(UserLoginUseCase);
container.bind<UserLoginController>(UserLoginController).toSelf();
container.bind<HealthCheckController>(HealthCheckController).toSelf();
container
  .bind<ICreateProducerUseCase>(CREATE_PRODUCER_USE_CASE_TYPE)
  .to(CreateProducerUseCase);
container.bind<CreateProducerController>(CreateProducerController).toSelf();
container
  .bind<IListProducerUseCase>(LIST_PRODUCER_USE_CASE_TYPE)
  .to(ListProducerUseCase);
container.bind<ListProducerController>(ListProducerController).toSelf();
container
  .bind<IEditProducerUseCase>(EDIT_PRODUCER_USE_CASE_TYPE)
  .to(EditProducerUseCase);
container.bind<EditProducerController>(EditProducerController).toSelf();
container
  .bind<IDeleteProducerUseCase>(DELETE_PRODUCER_USE_CASE_TYPE)
  .to(DeleteProducerUseCase);
container.bind<DeleteProducerController>(DeleteProducerController).toSelf();
container
  .bind<ICreateFarmUseCase>(CREATE_FARM_USE_CASE_TYPE)
  .to(CreateFarmUseCase);
container.bind<CreateFarmController>(CreateFarmController).toSelf();
container
  .bind<ICreateCropUseCase>(CREATE_CROP_USE_CASE_TYPE)
  .to(CreateCropUseCase);
container.bind<CreateCropController>(CreateCropController).toSelf();
container
  .bind<IListFarmsUseCase>(LIST_FARMS_USE_CASE_TYPE)
  .to(ListFarmsUseCase);
container.bind<ListFarmsController>(ListFarmsController).toSelf();

// Database Resolvers
container.bind<IUserRepository>(USER_REPOSITORY_TYPE).to(UserRepository);
container
  .bind<IProducerRepository>(PRODUCER_REPOSITORY_TYPE)
  .to(ProducerRepository);
container.bind<IFarmRepository>(FARM_REPOSITORY_TYPE).to(FarmRepository);
container
  .bind<ICropTypeRepository>(CROP_TYPE_REPOSITORY_TYPE)
  .to(CropTypeRepository);
container
  .bind<IPlantedCropRepository>(PLANTED_CROP_REPOSITORY_TYPE)
  .to(PlantedCropRepository);

// Middleware Resolvers
container.bind<JwtAuthMiddleware>(JwtAuthMiddleware).toSelf();

export default container;
