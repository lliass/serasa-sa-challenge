import { Request, Response } from 'express';
import { getStatusCode } from 'http-status-codes';
import {
  ControllerSpecifications,
  IController,
} from '../../../common/interfaces/controller.interface';
import { CreateProducerRequestDTO } from './create-producer.dto';
import { inject, injectable } from 'inversify';
import HttpErrorInfra from '../../../../infrastructure/handlers/http-erro/http.error.infra';
import controllersConfig from '../config/controllers.config';
import {
  CREATE_PRODUCER_USE_CASE_TYPE,
  ICreateProducerUseCase,
} from './interfaces';
import ValidatePipeInfra from '../../../../infrastructure/handlers/pipes/validate-pipe.infra';

@injectable()
export default class CreateProducerController implements IController {
  specifications: ControllerSpecifications = {
    method: 'POST',
    route: `/${controllersConfig.baseEndPoint}`,
    hasJwtAuth: true,
  };

  @inject(HttpErrorInfra) httpError: HttpErrorInfra;

  @inject(CREATE_PRODUCER_USE_CASE_TYPE)
  useCase: ICreateProducerUseCase;

  @inject(ValidatePipeInfra) validatePipe: ValidatePipeInfra;

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, cnpj } =
      request.body as unknown as CreateProducerRequestDTO;

    try {
      await this.validatePipe.validateBody({
        body: request.body,
        RequestDTO: CreateProducerRequestDTO,
      });

      await this.useCase.execute({
        name,
        cpf,
        cnpj,
      });

      return response.status(getStatusCode('Created')).send();
    } catch (error) {
      return this.httpError.handler(response, error);
    }
  }
}
