import { ICropType } from './Icrop-type.entity';

interface ICropTypeRepository {
  saveOne(payload: Partial<ICropType>): Promise<ICropType>;
  findOne(payload: Partial<ICropType>): Promise<ICropType | null>;
  deleteOne(params: { id: number }): Promise<boolean>;
}

const CROP_TYPE_REPOSITORY_TYPE = Symbol.for('ICropTypeRepository');

export { CROP_TYPE_REPOSITORY_TYPE, ICropTypeRepository };
