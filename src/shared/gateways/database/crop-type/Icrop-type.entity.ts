import { IPlantedCrop } from '../planted-crop/Iplanted-crop.entity';

export interface ICropType {
  id: number;
  name: string;
  description: string;
  plantedCrops?: IPlantedCrop[];
}
