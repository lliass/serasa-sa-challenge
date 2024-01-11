import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IFarm } from '../Ifarm.entity';

@Entity({ name: 'farm' })
export class Farm implements IFarm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  producer_id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  hectares_total_area: number;

  @Column()
  agricultural_total_area: number;

  @Column()
  vegetation_total_area: number;
}
