import { Repository } from 'typeorm';
import { PostgresDataSource } from '../../../../../infrastructure/persistence/postgres/data-source';
import { Producer } from './producer.entity';
import { IProducerRepository } from '../Iproducer.repository';
import { injectable } from 'inversify';

@injectable()
export default class ProducerRepository implements IProducerRepository {
  private repository: Repository<Producer>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Producer);
  }

  async saveOne(payload: Partial<Producer>): Promise<Producer> {
    const result = await this.repository.save(payload);

    return result;
  }

  async findOne(payload: Partial<Producer>): Promise<Producer | null> {
    const result = await this.repository.findOne({
      where: { ...payload },
    });

    return result;
  }

  async updateOne(params: {
    id: number;
    payload: Partial<Producer>;
  }): Promise<boolean> {
    const { id, payload } = params;

    const result = await this.repository.update(id, payload);

    return !!result.affected;
  }
}
