import container from '../../../../config/inversify.config';
import ListProducerController from './list-producer.controller';

const listProducerController = container.get<ListProducerController>(
  ListProducerController,
);

export { listProducerController };
