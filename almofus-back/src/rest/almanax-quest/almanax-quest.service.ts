import { Injectable } from '@nestjs/common';
import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';
import { AlmanaxMobileDateRepository } from 'src/db/repositories/almanax-mobile-date/almanax-mobile-date.repository';
import { AlmanaxQuestRepository } from 'src/db/repositories/almanax-quest/almanax-quest.repository';
import { AlmanaxQuestWithYear } from './types/types';
import dayjs from 'dayjs';
import { AlmanaxMobileDate } from '../../db/model/almanax-mobile-date.entity';

@Injectable()
export class AlmanaxQuestService {
  constructor(
    private readonly almanaxQuestRepository: AlmanaxQuestRepository,
    private readonly almanaxMobileDateRepository: AlmanaxMobileDateRepository,
  ) {}

  async getAlmanaxQuestByDate(date: Date): Promise<AlmanaxQuestWithYear> {
    const dateDayjs = dayjs(date);
    const [dayStr, monthStr, yearStr] = dateDayjs.format('DD/MM/YYYY').split('/');
    const questDate = parseInt(monthStr + dayStr);
    const questYear = parseInt(yearStr);

    const mobileDate = await this.almanaxMobileDateRepository.findOneByDateAndYear(questDate, questYear);
    if (!mobileDate) {
      const almanaxQuest = await this.almanaxQuestRepository.findOneByDate(questDate);
      return { ...almanaxQuest, year: questYear };
    }

    const almanaxQuest = await this.almanaxQuestRepository.findById(mobileDate.questId);
    return { ...almanaxQuest, year: questYear };
  }

  async getAlmanaxQuestByDateRange(startDate: Date, endDate: Date): Promise<AlmanaxQuestWithYear[]> {
    const startDateDayjs = dayjs(startDate);
    const endDateDayjs = dayjs(endDate);
    const [startDay, startMonth, startYearStr] = startDateDayjs.format('DD/MM/YYYY').split('/');
    const [endDay, endMonth, endYearStr] = endDateDayjs.format('DD/MM/YYYY').split('/');

    const questStartDate = parseInt(startMonth + startDay);
    const questEndDate = parseInt(endMonth + endDay);
    const startYear = parseInt(startYearStr);
    const endYear = parseInt(endYearStr);

    const mobileDates = await this.almanaxMobileDateRepository.findAll();
    const mobileQuestsIds = mobileDates.map((mobileDate) => mobileDate.questId);
    const mobileQuests = await this.almanaxQuestRepository.findByIds(mobileQuestsIds);
    const mobileDateByCompleteDate: Record<string, AlmanaxMobileDate> = {};
    mobileDates.forEach(
      (mobileDate) => (mobileDateByCompleteDate[`${mobileDate.year}-${mobileDate.date}`] = mobileDate),
    );
    const mobileQuestById: Record<number, AlmanaxQuest> = {};
    mobileQuests.forEach((q) => (mobileQuestById[q.id] = q));

    const quests = await this.almanaxQuestRepository.findByDateRange(questStartDate, startYear, questEndDate, endYear);
    const questByDate: Record<number, AlmanaxQuest> = {};
    quests.forEach((q) => (questByDate[q.date] = q));

    let currentDayjs = startDateDayjs;
    const questsWithYears: AlmanaxQuestWithYear[] = [];

    while (currentDayjs.isBefore(endDateDayjs) || currentDayjs.isSame(endDateDayjs)) {
      const date = parseInt(currentDayjs.format('MMDD'));
      const completeDate = `${currentDayjs.year()}-${date}`;
      const mobileDate = mobileDateByCompleteDate[completeDate];
      const quest = mobileDate ? mobileQuestById[mobileDate.questId] : questByDate[date];
      if (quest) {
        questsWithYears.push({ ...quest, year: currentDayjs.year(), date });
      }

      currentDayjs = currentDayjs.add(1, 'day');
    }
    return questsWithYears;
  }
}
