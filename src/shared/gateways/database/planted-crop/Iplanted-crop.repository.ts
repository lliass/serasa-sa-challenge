import { IPlantedCrop } from './Iplanted-crop.entity';

interface IPlantedCropRepository {
  saveOne(payload: Partial<IPlantedCrop>): Promise<IPlantedCrop>;
  findMany(payload: Partial<IPlantedCrop>): Promise<IPlantedCrop[] | []>;
  findManyByFarmIds(params: {
    farmIds: number[];
  }): Promise<IPlantedCrop[] | []>;
  deleteMany(params: { ids: number[] }): Promise<boolean>;
}

const PLANTED_CROP_REPOSITORY_TYPE = Symbol.for('IPlantedCropRepository');

export { PLANTED_CROP_REPOSITORY_TYPE, IPlantedCropRepository };
