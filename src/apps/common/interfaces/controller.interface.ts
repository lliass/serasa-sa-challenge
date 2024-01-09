import { Request, Response } from 'express';
import { HTTP_METHODS_ENUM } from '../enums/http.enum';
import HttpErrorInfra from '../../infrastructure/handlers/http-erro/http.error.infra';
import { IUseCase } from './use-case.interface';
import ValidatePipeInfra from '../../infrastructure/handlers/pipes/validate-pipe.infra';

type ControllerMethods = keyof typeof HTTP_METHODS_ENUM;

interface ControllerConfiguration {
  baseEndPoint: string;
}

type GoogleAuthConfig = 'redirect' | 'callback';

interface ControllerSpecifications {
  method: ControllerMethods;
  route: string;
  googleAuthConfig?: GoogleAuthConfig;
  hasJwtAuth: boolean;
}
interface IController {
  httpError: HttpErrorInfra;
  validatePipe?: ValidatePipeInfra;
  specifications: ControllerSpecifications;
  useCase?: IUseCase;
  handle(request: Request, response: Response): Promise<Response | void>;
}

const CONTROLLER_TYPE = Symbol.for('IController');

export {
  ControllerSpecifications,
  IController,
  CONTROLLER_TYPE,
  ControllerConfiguration,
};
