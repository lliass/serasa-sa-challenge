import { IUseCase } from '../../../common/interfaces/use-case.interface';
import {
  EditProducerRequestParamDTO,
  EditProducerRequestBodyDTO,
} from './edit-producer.dto';

interface IEditProducerUseCase extends IUseCase {
  execute(params: {
    param: EditProducerRequestParamDTO;
    body: EditProducerRequestBodyDTO;
  }): Promise<void>;
}

const EDIT_PRODUCER_USE_CASE_TYPE = Symbol.for('IEditProducerUseCase');

export { IEditProducerUseCase, EDIT_PRODUCER_USE_CASE_TYPE };
