import { IUseCase } from '../../../common/interfaces/use-case.interface';
import { DeleteProducerRequestDTO } from './delete-producer.dto';

interface IDeleteProducerUseCase extends IUseCase {
  execute(params: DeleteProducerRequestDTO): Promise<void>;
}

const DELETE_PRODUCER_USE_CASE_TYPE = Symbol.for('IDeleteProducerUseCase');

export { IDeleteProducerUseCase, DELETE_PRODUCER_USE_CASE_TYPE };
