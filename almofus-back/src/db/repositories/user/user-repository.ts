import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/db/model/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private repository: Repository<User>;

  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User> {
    return this.repository.findOneBy({
      id,
    });
  }
}
