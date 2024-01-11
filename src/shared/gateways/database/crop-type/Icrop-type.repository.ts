import { ICropType } from './Icrop-type.entity';

interface ICropTypeRepository {
  findOne(payload: Partial<ICropType>): Promise<ICropType | null>;
}

const CROP_TYPE_REPOSITORY_TYPE = Symbol.for('ICropTypeRepository');

export { CROP_TYPE_REPOSITORY_TYPE, ICropTypeRepository };
