import { Inject, Injectable } from '@nestjs/common';
import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AlmanaxQuestRepository {
  private repository: Repository<AlmanaxQuest>;

  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(AlmanaxQuest);
  }
}
