import { Repository, In } from 'typeorm';
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

  async findMany(payload: Partial<Farm>): Promise<Farm[] | []> {
    const result = await this.repository.find({
      where: { ...payload },
    });

    return result;
  }

  async deleteMany(params: { ids: number[] }): Promise<boolean> {
    const { ids } = params;

    const result = await this.repository.delete({ id: In(ids) });

    return !!result.affected;
  }
}
