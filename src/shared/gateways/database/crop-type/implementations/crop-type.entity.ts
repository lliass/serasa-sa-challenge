import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICropType } from '../Icrop-type.entity';

@Entity({ name: 'croptype' })
export class CropType implements ICropType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
