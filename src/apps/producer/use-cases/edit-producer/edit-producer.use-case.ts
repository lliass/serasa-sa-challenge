import { IEditProducerUseCase } from './interfaces';
import { inject, injectable } from 'inversify';
import {
  EditProducerRequestParamDTO,
  EditProducerRequestBodyDTO,
} from './edit-producer.dto';
import {
  IProducerRepository,
  PRODUCER_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/producer/Iproducer.repository';
import { NotFound, BadRequest } from 'http-errors';

@injectable()
export default class EditProducerUseCase implements IEditProducerUseCase {
  @inject(PRODUCER_REPOSITORY_TYPE)
  private producerRepository: IProducerRepository;

  async execute(params: {
    param: EditProducerRequestParamDTO;
    body: EditProducerRequestBodyDTO;
  }): Promise<void> {
    const { param, body } = params;

    const producerFound = await this.producerRepository.findOne({
      id: +param.id,
    });

    if (!producerFound)
      throw new NotFound('No producer was found with this identifier');

    if (!!body.cpf) {
      const producerFoundWithTheSameCPF = await this.producerRepository.findOne(
        {
          cpf: body.cpf,
        },
      );

      if (
        producerFoundWithTheSameCPF &&
        producerFoundWithTheSameCPF.id !== +param.id
      ) {
        throw new BadRequest('CPF or CNPJ is already in use');
      }
    }

    await this.producerRepository.updateOne({
      id: +param.id,
      payload: body,
    });
  }
}
