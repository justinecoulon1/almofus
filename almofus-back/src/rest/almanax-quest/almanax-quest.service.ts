import { Injectable } from '@nestjs/common';
import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';
import { AlmanaxMobileDateRepository } from 'src/db/repositories/almanax-mobile-date/almanax-mobile-date.repository';
import { AlmanaxQuestRepository } from 'src/db/repositories/almanax-quest/almanax-quest.repository';

@Injectable()
export class AlmanaxQuestService {
  constructor(
    private readonly almanaxQuestRepository: AlmanaxQuestRepository,
    private readonly almanaxMobileDateRepository: AlmanaxMobileDateRepository,
  ) {}

  async getAlmanaxQuestByDate(date: number, year: number): Promise<AlmanaxQuest> {
    const mobileDate = await this.almanaxMobileDateRepository.findOneByDateAndYear(date, year);
    if (!mobileDate) {
      return this.almanaxQuestRepository.findOneByDate(date);
    }

    return this.almanaxQuestRepository.findById(mobileDate.questId);
  }

  async getAlmanaxQuestByDateRange(startDate: number, startYear: number, endDate: number, endYear: number) {
    return this.almanaxQuestRepository.findByDateRange(startDate, startYear, endDate, endYear);
  }
}
