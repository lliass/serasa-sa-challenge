import 'reflect-metadata';
import express, { Express, Router } from 'express';
import cors from 'cors';
import { apiVariables } from './config/variables.config';
import {
  ApplicationConfigurations,
  IApplication,
} from './shared/interfaces/application.interface';
import { IController } from './shared/interfaces/controller.interface';
import { HTTP_METHODS_ENUM } from './shared/enums/http.enum';
import JwtAuthMiddleware from './shared/middlewares/jwt-auth/jwt-auth.middleware';
import { jwtAuthMiddleware } from './shared/middlewares/jwt-auth/index';
import { registerUserController } from './apps/user/use-cases/register-user/index';
import { userLoginController } from './apps/user/use-cases/user-login/index';
import { healthCheckController } from './apps/health-check/index';

export default class Application implements IApplication {
  private engine: Express = express();
  private router: Router = Router();
  private jwtAuth: JwtAuthMiddleware = jwtAuthMiddleware;
  private controllers: IController[] = [
    healthCheckController,
    registerUserController,
    userLoginController,
  ];
  private configurations: ApplicationConfigurations = {
    corsSpecification: { origin: apiVariables.allowedDomains.split(',') },
    defaultCommunication: express.json(),
    prefix: 'api',
  };

  public start(): void {
    const { defaultCommunication, prefix } = this.configurations;

    this.engine.use(cors());

    this.engine.use(defaultCommunication);

    this.renderRoutes();

    const routes = this.router;

    this.engine.use(`/${prefix}`, routes);

    this.engine.listen(+apiVariables.port || 3000);
  }

  private renderRoutes(): void {
    try {
      for (const controller of this.controllers) {
        const { specifications } = controller;
        const expressMethod = HTTP_METHODS_ENUM[specifications.method];

        if (expressMethod) {
          if (specifications.hasJwtAuth) {
            this.router[expressMethod](
              specifications.route,
              (request, response, next) =>
                this.jwtAuth.active(request, response, next),
              async (request, response) => controller.handle(request, response),
            );
            continue;
          }

          this.router[expressMethod](
            specifications.route,
            async (request, response) => controller.handle(request, response),
          );
        } else {
          throw new Error('An error on initialization of application routes.');
        }
      }

      console.log({
        message: 'Routes for api has defined',
      });
    } catch (error) {
      console.error({
        errorMessage: 'An error on render routes for api',
        errorStack: error,
      });
    }
  }
}
