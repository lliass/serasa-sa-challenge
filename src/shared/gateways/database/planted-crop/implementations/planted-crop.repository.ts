import { Repository, In } from 'typeorm';
import { PostgresDataSource } from '../../../../../infrastructure/persistence/postgres/data-source';
import { PlantedCrop } from './planted-crop.entity';
import { IPlantedCropRepository } from '../Iplanted-crop.repository';
import { injectable } from 'inversify';

@injectable()
export default class PlantedCropRepository implements IPlantedCropRepository {
  private repository: Repository<PlantedCrop>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(PlantedCrop);
  }

  async saveOne(payload: Partial<PlantedCrop>): Promise<PlantedCrop> {
    const result = await this.repository.save(payload);

    return result;
  }

  async findMany(payload: Partial<PlantedCrop>): Promise<PlantedCrop[] | []> {
    const result = await this.repository.find({
      where: { ...payload },
    });

    return result;
  }

  async findManyByFarmIds(params: {
    farmIds: number[];
  }): Promise<PlantedCrop[] | []> {
    const { farmIds } = params;

    const result = await this.repository.find({
      where: { farm_id: In(farmIds) },
    });

    return result;
  }

  async deleteMany(params: { ids: number[] }): Promise<boolean> {
    const { ids } = params;

    const result = await this.repository.delete({ id: In(ids) });

    return !!result.affected;
  }
}
