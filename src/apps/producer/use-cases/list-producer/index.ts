import container from '../../../../config/inversify.config';
import ListProducerController from './list-producer.controller';

const listProducerUserController = container.get<ListProducerController>(
  ListProducerController,
);

export { listProducerUserController };
