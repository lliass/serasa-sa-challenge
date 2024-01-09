import { ICreateProducerUseCase } from './interfaces';
import { inject, injectable } from 'inversify';
import { CreateProducerRequestDTO } from './create-producer.dto';
import {
  IProducerRepository,
  PRODUCER_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/producer/Iproducer.repository';
import { BadRequest } from 'http-errors';

@injectable()
export default class CreateProducerUseCase implements ICreateProducerUseCase {
  @inject(PRODUCER_REPOSITORY_TYPE)
  private producerRepository: IProducerRepository;

  async execute(params: CreateProducerRequestDTO): Promise<void> {
    const { name, cpf, cnpj } = params;

    const userFound = await this.producerRepository.findOne({ cpf });

    if (!!userFound) throw new BadRequest('CPF or CNPJ already registered');

    const userFoundWithTheSameCNPJ = !!cnpj
      ? !!(await this.producerRepository.findOne({ cnpj }))
      : false;

    if (userFoundWithTheSameCNPJ)
      throw new BadRequest('CPF or CNPJ already registered');

    await this.producerRepository.saveOne({
      name,
      cpf,
      cnpj,
    });
  }
}
