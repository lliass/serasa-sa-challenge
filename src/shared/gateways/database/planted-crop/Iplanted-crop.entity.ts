import { IFarm } from '../farm/Ifarm.entity';
import { ICropType } from '../crop-type/Icrop-type.entity';

export interface IPlantedCrop {
  id: number;
  farm_id: number;
  crop_type_id: number;
  total_planted_area: number;
  farm?: IFarm;
  cropType?: ICropType;
}
