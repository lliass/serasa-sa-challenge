import { IFarm } from './Ifarm.entity';

interface IFarmRepository {
  saveOne(payload: Partial<IFarm>): Promise<IFarm>;
  findOne(payload: Partial<IFarm>): Promise<IFarm | null>;
  findMany(payload: Partial<IFarm>): Promise<IFarm[] | []>;
  deleteMany(params: { ids: number[] }): Promise<boolean>;
}

const FARM_REPOSITORY_TYPE = Symbol.for('IFarmRepository');

export { FARM_REPOSITORY_TYPE, IFarmRepository };
