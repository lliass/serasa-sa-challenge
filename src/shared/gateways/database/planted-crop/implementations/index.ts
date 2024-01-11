import container from '../../../../../config/inversify.config';
import {
  IPlantedCropRepository,
  PLANTED_CROP_REPOSITORY_TYPE,
} from '../Iplanted-crop.repository';

const plantedCropRepository = container.get<IPlantedCropRepository>(
  PLANTED_CROP_REPOSITORY_TYPE,
);

export { plantedCropRepository };
