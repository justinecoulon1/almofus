import { Inject, Injectable } from '@nestjs/common';
import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';
import { DataSource, IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class AlmanaxQuestRepository {
  private repository: Repository<AlmanaxQuest>;

  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(AlmanaxQuest);
  }

  createAlmanaxQuest(quest: AlmanaxQuest): Promise<AlmanaxQuest> {
    return this.repository.save(quest);
  }

  createAlmanaxQuests(quests: AlmanaxQuest[]): Promise<AlmanaxQuest[]> {
    return this.repository.save(quests);
  }

  findAll(): Promise<AlmanaxQuest[]> {
    return this.repository.find();
  }

  findMobileQuests(): Promise<AlmanaxQuest[]> {
    return this.repository.find({ where: { mobileEvent: Not(IsNull()) } });
  }
}
