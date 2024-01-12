import 'reflect-metadata';
import express, { Express, Router, json } from 'express';
import cors from 'cors';
import { loggerInfra } from './infrastructure/logger/index';
import { apiVariables } from './config/variables.config';
import { IController } from './apps/common/interfaces/controller.interface';
import { HTTP_METHODS_ENUM } from './apps/common/enums/http.enum';
import JwtAuthMiddleware from './shared/middlewares/jwt-auth/jwt-auth.middleware';
import { jwtAuthMiddleware } from './shared/middlewares/jwt-auth/index';
import { registerUserController } from './apps/user/use-cases/register-user/index';
import { userLoginController } from './apps/user/use-cases/user-login/index';
import { healthCheckController } from './apps/health-check/index';
import { createProducerController } from './apps/producer/use-cases/create-producer/index';
import { listProducerController } from './apps/producer/use-cases/list-producer/index';
import { editProducerController } from './apps/producer/use-cases/edit-producer/index';
import { deleteProducerController } from './apps/producer/use-cases/delete-producer/index';
import { createFarmController } from './apps/farm/use-cases/create-farm/index';
import { createCropController } from './apps/farm/use-cases/create-crop/index';
import { listFarmsController } from './apps/farm/use-cases/list-farms/index';

const expressJson = json();

export interface ApplicationConfigurations {
  corsSpecification: {
    origin: string[];
  };
  defaultCommunication: typeof expressJson;
  prefix: string;
}

export interface IApplication {
  start(): void;
}

export default class Application implements IApplication {
  private engine: Express = express();
  private router: Router = Router();
  private jwtAuth: JwtAuthMiddleware = jwtAuthMiddleware;
  private controllers: IController[] = [
    healthCheckController,
    registerUserController,
    userLoginController,
    createProducerController,
    listProducerController,
    editProducerController,
    deleteProducerController,
    createFarmController,
    createCropController,
    listFarmsController,
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

    loggerInfra.dynamicMessage({ message: 'Api has been initialized' });
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

      loggerInfra.dynamicMessage({
        message: 'Routes for api has defined',
      });
    } catch (error) {
      loggerInfra.error({
        errorMessage: 'An error on render routes for api',
        errorStack: error,
      });
    }
  }
}
