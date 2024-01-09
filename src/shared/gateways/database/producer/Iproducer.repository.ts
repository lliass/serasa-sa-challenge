import { IProducer } from './Iproducer.entity';

interface IProducerRepository {
  saveOne(payload: Partial<IProducer>): Promise<IProducer>;
  findOne(payload: Partial<IProducer>): Promise<IProducer | null>;
  updateOne(params: {
    id: number;
    payload: Partial<IProducer>;
  }): Promise<boolean>;
}

const PRODUCER_REPOSITORY_TYPE = Symbol.for('IProducerRepository');

export { PRODUCER_REPOSITORY_TYPE, IProducerRepository };
