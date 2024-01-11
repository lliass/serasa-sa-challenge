import container from '../../../../../config/inversify.config';
import {
  ICropTypeRepository,
  CROP_TYPE_REPOSITORY_TYPE,
} from '../Icrop-type.repository';

const cropTypeRepository = container.get<ICropTypeRepository>(
  CROP_TYPE_REPOSITORY_TYPE,
);

export { cropTypeRepository };
