import { Request, Response } from 'express';
import { getStatusCode } from 'http-status-codes';
import {
  ControllerSpecifications,
  IController,
} from '../../../common/interfaces/controller.interface';
import {
  CreateCropRequestParamDTO,
  CreateCropRequestBodyDTO,
} from './create-crop.dto';
import { inject, injectable } from 'inversify';
import HttpErrorInfra from '../../../../infrastructure/handlers/http-erro/http.error.infra';
import controllersConfig from '../../config/controllers.config';
import { CREATE_CROP_USE_CASE_TYPE, ICreateCropUseCase } from './interfaces';
import ValidatePipeInfra from '../../../../infrastructure/handlers/pipes/validate-pipe.infra';

@injectable()
export default class CreateCropController implements IController {
  specifications: ControllerSpecifications = {
    method: 'POST',
    route: `/${controllersConfig.baseEndPoint}/:id/plant`,
    hasJwtAuth: true,
  };

  @inject(HttpErrorInfra) httpError: HttpErrorInfra;

  @inject(CREATE_CROP_USE_CASE_TYPE)
  useCase: ICreateCropUseCase;

  @inject(ValidatePipeInfra) validatePipe: ValidatePipeInfra;

  async handle(request: Request, response: Response): Promise<Response> {
    const requestParam = request.params as unknown as CreateCropRequestParamDTO;
    const requestBody = request.body as unknown as CreateCropRequestBodyDTO;

    try {
      await Promise.all([
        this.validatePipe.validateParams({
          queryParams: request.params,
          RequestDTO: CreateCropRequestParamDTO,
        }),
        this.validatePipe.validateBody({
          body: request.body,
          RequestDTO: CreateCropRequestBodyDTO,
        }),
      ]);

      const newCrop = await this.useCase.execute({
        param: requestParam,
        body: requestBody,
      });

      return response.status(getStatusCode('Created')).json(newCrop);
    } catch (error) {
      return this.httpError.handler(response, error);
    }
  }
}
