import container from '../../../../config/inversify.config';
import CreateProducerController from './create-producer.controller';

const createProducerController = container.get<CreateProducerController>(
  CreateProducerController,
);

export { createProducerController };
