import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IProducer } from '../Iproducer.entity';

@Entity({ name: 'producer' })
export class Producer implements IProducer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true, nullable: true })
  cnpj: string;

  @Column()
  name: string;
}
