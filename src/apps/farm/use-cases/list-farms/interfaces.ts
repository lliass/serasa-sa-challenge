import { IUseCase } from '../../../common/interfaces/use-case.interface';
import { ListFarmsResponseDTO } from './list-farms.dto';

interface IListFarmsUseCase extends IUseCase {
  execute(): Promise<ListFarmsResponseDTO[]>;
}

const LIST_FARMS_USE_CASE_TYPE = Symbol.for('IListFarmsUseCase');

export { IListFarmsUseCase, LIST_FARMS_USE_CASE_TYPE };
