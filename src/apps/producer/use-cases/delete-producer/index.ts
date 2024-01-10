import container from '../../../../config/inversify.config';
import DeleteProducerController from './delete-producer.controller';

const deleteProducerController = container.get<DeleteProducerController>(
  DeleteProducerController,
);

export { deleteProducerController };
