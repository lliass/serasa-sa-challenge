import { Repository } from 'typeorm';
import { PostgresDataSource } from '../../../../../infrastructure/persistence/postgres/data-source';
import { CropType } from './crop-type.entity';
import { ICropTypeRepository } from '../Icrop-type.repository';
import { injectable } from 'inversify';

@injectable()
export default class CropTypeRepository implements ICropTypeRepository {
  private repository: Repository<CropType>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(CropType);
  }

  async findOne(payload: Partial<CropType>): Promise<CropType | null> {
    const result = await this.repository.findOne({
      where: { ...payload },
    });

    return result;
  }
}
