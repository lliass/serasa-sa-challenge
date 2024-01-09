import { Container } from 'inversify';

// Infra Imports
import HttpErrorInfra from '../infrastructure/handlers/http-erro/http.error.infra';
import ValidatePipeInfra from '../infrastructure/handlers/pipes/validate-pipe.infra';
import {
  CRYPTO_INFRA_TYPE,
  ICryptoInfra,
} from '../infrastructure/crypto/Icrypto.infra';
import CryptoInfra from '../infrastructure/crypto/implementation/crypto.infra';

// Use Cases Imports
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

// Database Imports
import {
  IUserRepository,
  USER_REPOSITORY_TYPE,
} from '../shared/gateways/database/user/Iuser.repository';
import UserRepository from '../shared/gateways/database/user/implementations/user.repository';

// Middleware Imports
import JwtAuthMiddleware from '../shared/middlewares/jwt-auth/jwt-auth.middleware';

const container = new Container();

// Infra Resolvers
container.bind<HttpErrorInfra>(HttpErrorInfra).toSelf();
container.bind<ValidatePipeInfra>(ValidatePipeInfra).toSelf();
container.bind<ICryptoInfra>(CRYPTO_INFRA_TYPE).to(CryptoInfra);

// Use Case Resolvers
container
  .bind<IRegisterUserUseCase>(REGISTER_USER_USE_CASE_TYPE)
  .to(RegisterUserUseCase);
container.bind<RegisterUserController>(RegisterUserController).toSelf();
container
  .bind<IUserLoginUseCase>(USER_LOGIN_USE_CASE_TYPE)
  .to(UserLoginUseCase);
container.bind<UserLoginController>(UserLoginController).toSelf();
container.bind<HealthCheckController>(HealthCheckController).toSelf();

// Database Resolvers
container.bind<IUserRepository>(USER_REPOSITORY_TYPE).to(UserRepository);

// Middleware Resolvers
container.bind<JwtAuthMiddleware>(JwtAuthMiddleware).toSelf();

export default container;
