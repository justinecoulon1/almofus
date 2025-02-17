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

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<User> {
    return this.repository.findOneBy({
      id,
    });
  }

  save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
