import container from '../../../../config/inversify.config';
import ListFarmsController from './list-farms.controller';

const listFarmsController =
  container.get<ListFarmsController>(ListFarmsController);

export { listFarmsController };
