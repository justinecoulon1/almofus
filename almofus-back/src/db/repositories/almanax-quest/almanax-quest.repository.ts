import { Inject, Injectable } from '@nestjs/common';
import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';
import { Between, DataSource, In, IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class AlmanaxQuestRepository {
  private repository: Repository<AlmanaxQuest>;

  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(AlmanaxQuest);
  }

  saveAlmanaxQuest(quest: AlmanaxQuest): Promise<AlmanaxQuest> {
    return this.repository.save(quest);
  }

  saveAlmanaxQuests(quests: AlmanaxQuest[]): Promise<AlmanaxQuest[]> {
    return this.repository.save(quests);
  }

  findAll(): Promise<AlmanaxQuest[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<AlmanaxQuest> {
    return this.repository.findOneBy({ id });
  }

  findByIds(ids: number[]): Promise<AlmanaxQuest[]> {
    return this.repository.findBy({ id: In(ids) });
  }

  findOneByDate(date: number): Promise<AlmanaxQuest> {
    return this.repository.findOneBy({ date });
  }

  findMobileQuests(): Promise<AlmanaxQuest[]> {
    return this.repository.find({ where: { mobileEvent: Not(IsNull()) } });
  }

  findByDateRange(startDate: number, startYear: number, endDate: number, endYear: number) {
    if (startYear === endYear) {
      return this.repository.find({
        where: {
          date: Between(startDate, endDate),
        },
      });
    } else if (endYear - startYear === 1) {
      return this.repository.find({
        where: [{ date: Between(startDate, 1231) }, { date: Between(101, endDate) }],
      });
    } else {
      return this.repository.find();
    }
  }
}
