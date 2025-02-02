import { Inject, Injectable } from '@nestjs/common';
import { AlmanaxBonus } from 'src/db/model/almanax-bonus.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AlmanaxBonusRepository {
  private repository: Repository<AlmanaxBonus>;

  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(AlmanaxBonus);
  }

  findAll(): Promise<AlmanaxBonus[]> {
    return this.repository.find();
  }
}
