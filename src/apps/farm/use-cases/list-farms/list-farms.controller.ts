import { Request, Response } from 'express';
import { getStatusCode } from 'http-status-codes';
import {
  ControllerSpecifications,
  IController,
} from '../../../common/interfaces/controller.interface';
import { inject, injectable } from 'inversify';
import HttpErrorInfra from '../../../../infrastructure/handlers/http-erro/http.error.infra';
import controllersConfig from '../../../farm/config/controllers.config';
import { LIST_FARMS_USE_CASE_TYPE, IListFarmsUseCase } from './interfaces';
import ValidatePipeInfra from '../../../../infrastructure/handlers/pipes/validate-pipe.infra';

@injectable()
export default class ListFarmsController implements IController {
  specifications: ControllerSpecifications = {
    method: 'GET',
    route: `/${controllersConfig.baseEndPoint}/general`,
    hasJwtAuth: true,
  };

  @inject(HttpErrorInfra) httpError: HttpErrorInfra;

  @inject(LIST_FARMS_USE_CASE_TYPE)
  useCase: IListFarmsUseCase;

  @inject(ValidatePipeInfra) validatePipe: ValidatePipeInfra;

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listedFarms = await this.useCase.execute();

      return response.status(getStatusCode('OK')).json(listedFarms);
    } catch (error) {
      return this.httpError.handler(response, error);
    }
  }
}
