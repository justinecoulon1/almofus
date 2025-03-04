import { Injectable } from '@nestjs/common';
import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';
import { AlmanaxMobileDateRepository } from 'src/db/repositories/almanax-mobile-date/almanax-mobile-date.repository';
import { AlmanaxQuestRepository } from 'src/db/repositories/almanax-quest/almanax-quest.repository';
import dayjs from 'dayjs';

@Injectable()
export class AlmanaxQuestService {
  constructor(
    private readonly almanaxQuestRepository: AlmanaxQuestRepository,
    private readonly almanaxMobileDateRepository: AlmanaxMobileDateRepository,
  ) {}

  async getAlmanaxQuestByDate(date: string, year: number): Promise<AlmanaxQuest> {
    const mobileDate = await this.almanaxMobileDateRepository.findOneByDateAndYear(date, year);
    if (!mobileDate) {
      return this.almanaxQuestRepository.findOneByDate(date);
    }

    return this.almanaxQuestRepository.findById(mobileDate.questId);
  }

  async getAlmanaxQuestByDateRange(startDateStr: string, startYear: number, endDateStr: string, endYear: number) {
    const mobileDates = await this.almanaxMobileDateRepository.findByYear(startYear);
    if (endYear !== startYear) {
      mobileDates.push(...(await this.almanaxMobileDateRepository.findByYear(startYear)));
    }

    const almanaxQuests = [];

    const [startDay, startMonth] = startDateStr.split('/');
    const [endDay, endMonth] = endDateStr.split('/');

    const startDate = dayjs(new Date(startYear, parseInt(startMonth) - 1, parseInt(startDay)));
    const endDate = dayjs(new Date(endYear, parseInt(endMonth) - 1, parseInt(endDay)));

    let currentDate = startDate;

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      currentDate = currentDate.add(1, 'day');
      const currentFormattedDate = currentDate.format('DD/MM');
      almanaxQuests.push(await this.almanaxQuestRepository.findOneByDate(currentFormattedDate));
    }
    return almanaxQuests;
  }
}
