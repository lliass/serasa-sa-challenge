import { Request, Response } from 'express';
import { getStatusCode } from 'http-status-codes';
import {
  ControllerSpecifications,
  IController,
} from '../../../common/interfaces/controller.interface';
import { DeleteProducerRequestDTO } from './delete-producer.dto';
import { inject, injectable } from 'inversify';
import HttpErrorInfra from '../../../../infrastructure/handlers/http-erro/http.error.infra';
import controllersConfig from '../../config/controllers.config';
import {
  DELETE_PRODUCER_USE_CASE_TYPE,
  IDeleteProducerUseCase,
} from './interfaces';
import ValidatePipeInfra from '../../../../infrastructure/handlers/pipes/validate-pipe.infra';

@injectable()
export default class DeleteProducerController implements IController {
  specifications: ControllerSpecifications = {
    method: 'DELETE',
    route: `/${controllersConfig.baseEndPoint}/:id`,
    hasJwtAuth: true,
  };

  @inject(HttpErrorInfra) httpError: HttpErrorInfra;

  @inject(DELETE_PRODUCER_USE_CASE_TYPE)
  useCase: IDeleteProducerUseCase;

  @inject(ValidatePipeInfra) validatePipe: ValidatePipeInfra;

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as unknown as DeleteProducerRequestDTO;

    try {
      await this.validatePipe.validateParams({
        queryParams: request.params,
        RequestDTO: DeleteProducerRequestDTO,
      });

      await this.useCase.execute({
        id,
      });

      return response.status(getStatusCode('No Content')).send();
    } catch (error) {
      return this.httpError.handler(response, error);
    }
  }
}
