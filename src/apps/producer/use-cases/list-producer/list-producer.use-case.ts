import { IListProducerUseCase } from './interfaces';
import { inject, injectable } from 'inversify';
import {
  ListProducerRequestDTO,
  ListProducerResponseDTO,
} from './list-producer.dto';
import {
  IProducerRepository,
  PRODUCER_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/producer/Iproducer.repository';
import { NotFound } from 'http-errors';

@injectable()
export default class ListProducerUseCase implements IListProducerUseCase {
  @inject(PRODUCER_REPOSITORY_TYPE)
  private producerRepository: IProducerRepository;

  async execute(
    params: ListProducerRequestDTO,
  ): Promise<ListProducerResponseDTO> {
    const { id } = params;

    const userFound = await this.producerRepository.findOne({ id: +id });

    if (!userFound)
      throw new NotFound('No producer was found with this identifier');

    return userFound;
  }
}
