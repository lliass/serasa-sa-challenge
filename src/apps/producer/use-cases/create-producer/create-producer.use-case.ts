import { ICreateProducerUseCase } from './interfaces';
import { inject, injectable } from 'inversify';
import {
  CreateProducerRequestDTO,
  CreateProducerResponseDTO,
} from './create-producer.dto';
import {
  IProducerRepository,
  PRODUCER_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/producer/Iproducer.repository';
import { BadRequest } from 'http-errors';

@injectable()
export default class CreateProducerUseCase implements ICreateProducerUseCase {
  @inject(PRODUCER_REPOSITORY_TYPE)
  private producerRepository: IProducerRepository;

  async execute(
    params: CreateProducerRequestDTO,
  ): Promise<CreateProducerResponseDTO> {
    const { name, cpf, cnpj } = params;

    const producerFound = await this.producerRepository.findOne({ cpf });

    if (!!producerFound) throw new BadRequest('CPF or CNPJ already registered');

    const producerFoundWithTheSameCNPJ = !!cnpj
      ? !!(await this.producerRepository.findOne({ cnpj }))
      : false;

    if (producerFoundWithTheSameCNPJ)
      throw new BadRequest('CPF or CNPJ already registered');

    const newProducer = await this.producerRepository.saveOne({
      name,
      cpf,
      cnpj,
    });

    return newProducer;
  }
}
