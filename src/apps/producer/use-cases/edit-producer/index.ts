import container from '../../../../config/inversify.config';
import EditProducerController from './edit-producer.controller';

const editProducerUserController = container.get<EditProducerController>(
  EditProducerController,
);

export { editProducerUserController };
