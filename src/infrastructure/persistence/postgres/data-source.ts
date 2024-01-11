import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { postgresVariables } from '../../../config/variables.config';
import { User } from '../../../shared/gateways/database/user/implementations/user.entity';
import { Producer } from '../../../shared/gateways/database/producer/implementations/producer.entity';
import { Farm } from '../../../shared/gateways/database/farm/implementations/farm.entity';
import { CropType } from '../../../shared/gateways/database/crop-type/implementations/crop-type.entity';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: postgresVariables.host,
  port: +postgresVariables.port,
  username: postgresVariables.username,
  password: postgresVariables.password,
  database: postgresVariables.dbName,
  synchronize: false,
  entities: [User, Producer, Farm, CropType],
  subscribers: [],
  migrations: [],
});
