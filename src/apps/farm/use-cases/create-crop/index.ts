import container from '../../../../config/inversify.config';
import CreateCropController from './create-crop.controller';

const createCropController =
  container.get<CreateCropController>(CreateCropController);

export { createCropController };
