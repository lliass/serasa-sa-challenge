import { Request, Response } from 'express';
import { getStatusCode } from 'http-status-codes';
import {
  ControllerSpecifications,
  IController,
} from '../../../common/interfaces/controller.interface';
import { ListProducerRequestDTO } from './list-producer.dto';
import { inject, injectable } from 'inversify';
import HttpErrorInfra from '../../../../infrastructure/handlers/http-erro/http.error.infra';
import controllersConfig from '../../config/controllers.config';
import {
  LIST_PRODUCER_USE_CASE_TYPE,
  IListProducerUseCase,
} from './interfaces';
import ValidatePipeInfra from '../../../../infrastructure/handlers/pipes/validate-pipe.infra';

@injectable()
export default class ListProducerController implements IController {
  specifications: ControllerSpecifications = {
    method: 'GET',
    route: `/${controllersConfig.baseEndPoint}/:id`,
    hasJwtAuth: true,
  };

  @inject(HttpErrorInfra) httpError: HttpErrorInfra;

  @inject(LIST_PRODUCER_USE_CASE_TYPE)
  useCase: IListProducerUseCase;

  @inject(ValidatePipeInfra) validatePipe: ValidatePipeInfra;

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as unknown as ListProducerRequestDTO;

    try {
      await this.validatePipe.validateParams({
        queryParams: request.params,
        RequestDTO: ListProducerRequestDTO,
      });

      const producerFound = await this.useCase.execute({
        id,
      });

      return response.status(getStatusCode('OK')).json(producerFound);
    } catch (error) {
      return this.httpError.handler(response, error);
    }
  }
}
