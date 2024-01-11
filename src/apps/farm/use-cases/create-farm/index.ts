import container from '../../../../config/inversify.config';
import CreateFarmController from './create-farm.controller';

const createFarmController =
  container.get<CreateFarmController>(CreateFarmController);

export { createFarmController };
