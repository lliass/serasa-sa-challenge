import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../Iuser.entity';

@Entity({ name: 'userlogin' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  blocked: boolean;

  @Column()
  attempts: number;
}
