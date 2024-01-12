import { IUseCase } from '../../../common/interfaces/use-case.interface';
import {
  CreateCropRequestParamDTO,
  CreateCropRequestBodyDTO,
  CreateCropResponseDTO,
} from './create-crop.dto';

interface ICreateCropUseCase extends IUseCase {
  execute(params: {
    param: CreateCropRequestParamDTO;
    body: CreateCropRequestBodyDTO;
  }): Promise<CreateCropResponseDTO>;
}

const CREATE_CROP_USE_CASE_TYPE = Symbol.for('ICreateCropUseCase');

export { ICreateCropUseCase, CREATE_CROP_USE_CASE_TYPE };
