import { IUseCase } from '../../../common/interfaces/use-case.interface';
import {
  CreateFarmRequestParamDTO,
  CreateFarmRequestBodyDTO,
  CreateFarmResponseDTO,
} from './create-farm.dto';

interface ICreateFarmUseCase extends IUseCase {
  execute(params: {
    param: CreateFarmRequestParamDTO;
    body: CreateFarmRequestBodyDTO;
  }): Promise<CreateFarmResponseDTO>;
}

const CREATE_FARM_USE_CASE_TYPE = Symbol.for('ICreateFarmUseCase');

export { ICreateFarmUseCase, CREATE_FARM_USE_CASE_TYPE };
