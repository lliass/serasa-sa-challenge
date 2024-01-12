import { Request, Response } from 'express';
import { getStatusCode } from 'http-status-codes';
import {
  ControllerSpecifications,
  IController,
} from '../../../common/interfaces/controller.interface';
import {
  CreateFarmRequestParamDTO,
  CreateFarmRequestBodyDTO,
} from './create-farm.dto';
import { inject, injectable } from 'inversify';
import HttpErrorInfra from '../../../../infrastructure/handlers/http-erro/http.error.infra';
import controllersConfig from '../../../farm/config/controllers.config';
import { CREATE_FARM_USE_CASE_TYPE, ICreateFarmUseCase } from './interfaces';
import ValidatePipeInfra from '../../../../infrastructure/handlers/pipes/validate-pipe.infra';

@injectable()
export default class CreateFarmController implements IController {
  specifications: ControllerSpecifications = {
    method: 'POST',
    route: `/${controllersConfig.baseEndPoint}/producer/:id`,
    hasJwtAuth: true,
  };

  @inject(HttpErrorInfra) httpError: HttpErrorInfra;

  @inject(CREATE_FARM_USE_CASE_TYPE)
  useCase: ICreateFarmUseCase;

  @inject(ValidatePipeInfra) validatePipe: ValidatePipeInfra;

  async handle(request: Request, response: Response): Promise<Response> {
    const requestParam = request.params as unknown as CreateFarmRequestParamDTO;
    const requestBody = request.body as unknown as CreateFarmRequestBodyDTO;

    try {
      await Promise.all([
        this.validatePipe.validateParams({
          queryParams: request.params,
          RequestDTO: CreateFarmRequestParamDTO,
        }),
        this.validatePipe.validateBody({
          body: request.body,
          RequestDTO: CreateFarmRequestBodyDTO,
        }),
      ]);

      const newFarm = await this.useCase.execute({
        param: requestParam,
        body: requestBody,
      });

      return response.status(getStatusCode('Created')).json(newFarm);
    } catch (error) {
      return this.httpError.handler(response, error);
    }
  }
}
