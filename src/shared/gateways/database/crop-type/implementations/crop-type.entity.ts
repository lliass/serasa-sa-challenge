import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ICropType } from '../Icrop-type.entity';
import { PlantedCrop } from '../../planted-crop/implementations/planted-crop.entity';

@Entity({ name: 'croptype' })
export class CropType implements ICropType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => PlantedCrop, (plantedCrop) => plantedCrop.id)
  plantedCrops?: PlantedCrop[];
}
