import { Repository } from 'typeorm';
import { PostgresDataSource } from '../../../../../infrastructure/persistence/postgres/data-source';
import { User } from './user.entity';
import { IUserRepository } from '../Iuser.repository';
import { injectable } from 'inversify';

@injectable()
export default class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(User);
  }

  async saveOne(payload: Partial<User>): Promise<User> {
    console.log();
    const result = await this.repository.save(payload);

    return result;
  }

  async findOne(payload: Partial<User>): Promise<User | null> {
    const result = await this.repository.findOne({
      where: { ...payload },
    });

    return result;
  }

  async updateOne(params: {
    id: number;
    payload: Partial<User>;
  }): Promise<boolean> {
    const { id, payload } = params;

    const result = await this.repository.update(id, payload);

    return !!result.affected;
  }
}
