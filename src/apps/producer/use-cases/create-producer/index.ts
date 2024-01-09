import container from '../../../../config/inversify.config';
import CreateProducerController from './create-producer.controller';

const createProducerUserController = container.get<CreateProducerController>(
  CreateProducerController,
);

export { createProducerUserController };
