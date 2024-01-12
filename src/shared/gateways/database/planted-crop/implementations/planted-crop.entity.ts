import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IPlantedCrop } from '../Iplanted-crop.entity';
import { Farm } from '../../farm/implementations/farm.entity';
import { CropType } from '../../crop-type/implementations/crop-type.entity';

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

  @ManyToOne(() => Farm, (farm) => farm.plantedCrops)
  @JoinColumn({ name: 'farm_id' })
  farm?: Farm;

  @ManyToOne(() => CropType, (cropType) => cropType.plantedCrops)
  @JoinColumn({ name: 'farm_id' })
  cropType?: CropType;
}
