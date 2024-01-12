import container from '../../../../../config/inversify.config';
import {
  IProducerRepository,
  PRODUCER_REPOSITORY_TYPE,
} from '../Iproducer.repository';

const producerRepository = container.get<IProducerRepository>(
  PRODUCER_REPOSITORY_TYPE,
);

export { producerRepository };
