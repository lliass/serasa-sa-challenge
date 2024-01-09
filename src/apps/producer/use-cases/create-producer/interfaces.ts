import { IUseCase } from '../../../common/interfaces/use-case.interface';
import { CreateProducerRequestDTO } from './create-producer.dto';

interface ICreateProducerUseCase extends IUseCase {
  execute(params: CreateProducerRequestDTO): Promise<void>;
}

const CREATE_PRODUCER_USE_CASE_TYPE = Symbol.for('ICreateProducerUseCase');

export { ICreateProducerUseCase, CREATE_PRODUCER_USE_CASE_TYPE };
