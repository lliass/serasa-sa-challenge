import { IDeleteProducerUseCase } from './interfaces';
import { inject, injectable } from 'inversify';
import { DeleteProducerRequestDTO } from './delete-producer.dto';
import {
  IProducerRepository,
  PRODUCER_REPOSITORY_TYPE,
} from '../../../../shared/gateways/database/producer/Iproducer.repository';
import { NotFound } from 'http-errors';

@injectable()
export default class DeleteProducerUseCase implements IDeleteProducerUseCase {
  @inject(PRODUCER_REPOSITORY_TYPE)
  private producerRepository: IProducerRepository;

  async execute(params: DeleteProducerRequestDTO): Promise<void> {
    const { id } = params;

    const producerFound = await this.producerRepository.findOne({
      id: +id,
    });

    if (!producerFound)
      throw new NotFound('No producer was found with this identifier');

    await this.producerRepository.deleteOne({ id: +id });
  }
}
