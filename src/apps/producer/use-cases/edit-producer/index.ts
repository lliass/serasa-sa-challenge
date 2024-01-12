import container from '../../../../config/inversify.config';
import EditProducerController from './edit-producer.controller';

const editProducerController = container.get<EditProducerController>(
  EditProducerController,
);

export { editProducerController };
