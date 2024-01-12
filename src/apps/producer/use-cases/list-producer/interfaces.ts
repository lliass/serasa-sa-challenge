import { IUseCase } from '../../../common/interfaces/use-case.interface';
import {
  ListProducerRequestDTO,
  ListProducerResponseDTO,
} from './list-producer.dto';

interface IListProducerUseCase extends IUseCase {
  execute(params: ListProducerRequestDTO): Promise<ListProducerResponseDTO>;
}

const LIST_PRODUCER_USE_CASE_TYPE = Symbol.for('IListProducerUseCase');

export { IListProducerUseCase, LIST_PRODUCER_USE_CASE_TYPE };
