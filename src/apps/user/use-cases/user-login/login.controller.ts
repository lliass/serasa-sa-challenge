import { Request, Response } from 'express';
import { getStatusCode } from 'http-status-codes';
import {
  ControllerSpecifications,
  IController,
} from '../../../common/interfaces/controller.interface';
import { UserLoginRequestDTO } from './login.dto';
import { inject, injectable } from 'inversify';
import HttpErrorInfra from '../../../../infrastructure/handlers/http-erro/http.error.infra';
import controllersConfig from '../config/controllers.config';
import { USER_LOGIN_USE_CASE_TYPE, IUserLoginUseCase } from './interfaces';
import ValidatePipeInfra from '../../../../infrastructure/handlers/pipes/validate-pipe.infra';

@injectable()
export default class UserLoginController implements IController {
  specifications: ControllerSpecifications = {
    method: 'POST',
    route: `/${controllersConfig.baseEndPoint}/login`,
    hasJwtAuth: false,
  };

  @inject(HttpErrorInfra) httpError: HttpErrorInfra;

  @inject(USER_LOGIN_USE_CASE_TYPE)
  useCase: IUserLoginUseCase;

  @inject(ValidatePipeInfra) validatePipe: ValidatePipeInfra;

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body as unknown as UserLoginRequestDTO;

    try {
      await this.validatePipe.validateBody({
        body: request.body,
        RequestDTO: UserLoginRequestDTO,
      });

      const { token } = await this.useCase.execute({
        email,
        password,
      });

      return response.status(getStatusCode('Created')).json({ token });
    } catch (error) {
      return this.httpError.handler(response, error);
    }
  }
}
