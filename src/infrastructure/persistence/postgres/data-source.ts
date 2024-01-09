import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { postgresVariables } from '../../../config/variables.config';
import { User } from '../../../shared/gateways/database/user/implementations/user.entity';
import { Producer } from '../../../shared/gateways/database/producer/implementations/producer.entity';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: postgresVariables.host,
  port: +postgresVariables.port,
  username: postgresVariables.username,
  password: postgresVariables.password,
  database: postgresVariables.dbName,
  synchronize: false,
  entities: [User, Producer],
  subscribers: [],
  migrations: [],
});
