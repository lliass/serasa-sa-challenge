import { IPlantedCrop } from '../planted-crop/Iplanted-crop.entity';

export interface IFarm {
  id: number;
  producer_id: number;
  name: string;
  city: string;
  state: string;
  hectares_total_area: number;
  agricultural_total_area: number;
  vegetation_total_area: number;
  plantedCrops?: IPlantedCrop[];
}
