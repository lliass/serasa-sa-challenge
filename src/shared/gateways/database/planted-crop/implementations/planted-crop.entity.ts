import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPlantedCrop } from '../Iplanted-crop.entity';

@Entity({ name: 'plantedcrop' })
export class PlantedCrop implements IPlantedCrop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  farm_id: number;

  @Column()
  crop_type_id: number;

  @Column()
  total_planted_area: number;
}
