import { Repository } from 'typeorm';
import { PostgresDataSource } from '../../../../../infrastructure/persistence/postgres/data-source';
import { Farm } from './farm.entity';
import { IFarmRepository } from '../Ifarm.repository';
import { injectable } from 'inversify';

@injectable()
export default class FarmRepository implements IFarmRepository {
  private repository: Repository<Farm>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Farm);
  }

  async saveOne(payload: Partial<Farm>): Promise<Farm> {
    const result = await this.repository.save(payload);

    return result;
  }

  async findOne(payload: Partial<Farm>): Promise<Farm | null> {
    const result = await this.repository.findOne({
      where: { ...payload },
    });

    return result;
  }

  async updateOne(params: {
    id: number;
    payload: Partial<Farm>;
  }): Promise<boolean> {
    const { id, payload } = params;

    const result = await this.repository.update(id, payload);

    return !!result.affected;
  }

  async deleteOne(params: { id: number }): Promise<boolean> {
    const { id } = params;

    const result = await this.repository.delete(id);

    return !!result.affected;
  }
}
