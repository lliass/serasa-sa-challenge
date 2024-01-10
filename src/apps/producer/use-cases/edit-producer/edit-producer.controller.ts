import { Request, Response } from 'express';
import { getStatusCode } from 'http-status-codes';
import {
  ControllerSpecifications,
  IController,
} from '../../../common/interfaces/controller.interface';
import {
  EditProducerRequestParamDTO,
  EditProducerRequestBodyDTO,
} from './edit-producer.dto';
import { inject, injectable } from 'inversify';
import HttpErrorInfra from '../../../../infrastructure/handlers/http-erro/http.error.infra';
import controllersConfig from '../config/controllers.config';
import {
  EDIT_PRODUCER_USE_CASE_TYPE,
  IEditProducerUseCase,
} from './interfaces';
import ValidatePipeInfra from '../../../../infrastructure/handlers/pipes/validate-pipe.infra';

@injectable()
export default class EditProducerController implements IController {
  specifications: ControllerSpecifications = {
    method: 'PATCH',
    route: `/${controllersConfig.baseEndPoint}/:id`,
    hasJwtAuth: true,
  };

  @inject(HttpErrorInfra) httpError: HttpErrorInfra;

  @inject(EDIT_PRODUCER_USE_CASE_TYPE)
  useCase: IEditProducerUseCase;

  @inject(ValidatePipeInfra) validatePipe: ValidatePipeInfra;

  async handle(request: Request, response: Response): Promise<Response> {
    const requestParam =
      request.params as unknown as EditProducerRequestParamDTO;
    const requestBody = request.body as unknown as EditProducerRequestBodyDTO;

    try {
      await Promise.all([
        this.validatePipe.validateParams({
          queryParams: request.params,
          RequestDTO: EditProducerRequestParamDTO,
        }),
        this.validatePipe.validateBody({
          body: request.body,
          RequestDTO: EditProducerRequestBodyDTO,
        }),
      ]);

      await this.useCase.execute({
        param: requestParam,
        body: requestBody,
      });

      return response.status(getStatusCode('No Content')).send();
    } catch (error) {
      return this.httpError.handler(response, error);
    }
  }
}
