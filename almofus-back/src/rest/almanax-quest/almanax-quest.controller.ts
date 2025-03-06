import { Controller, Get, Query } from '@nestjs/common';
import {
  AlmanaxQuestDto,
  GetAlmanaxQuestByDateQueryParamsDto,
  GetAlmanaxQuestByDateRangeQueryParamsDto,
} from '../dto/almanax-quest.dto';
import almanaxQuestMapper from '../mapper/almanax-quest.mapper';
import { AlmanaxQuestService } from './almanax-quest.service';

@Controller('/quests')
export class AlmanaxQuestController {
  constructor(private readonly almanaxQuestService: AlmanaxQuestService) {}

  @Get()
  async getAlmanaxQuestByDate(@Query() queryParams: GetAlmanaxQuestByDateQueryParamsDto): Promise<AlmanaxQuestDto> {
    const almanaxQuest = await this.almanaxQuestService.getAlmanaxQuestByDate(queryParams.date, queryParams.year);
    return almanaxQuestMapper.toDto(almanaxQuest);
  }

  @Get('/date-range')
  async getAlmanaxQuestByDateRange(
    @Query() queryParams: GetAlmanaxQuestByDateRangeQueryParamsDto,
  ): Promise<AlmanaxQuestDto[]> {
    //TODO check if year 2 and date 2 are after year 1 and date 1

    const almanaxQuests = await this.almanaxQuestService.getAlmanaxQuestByDateRange(
      queryParams.startDate,
      queryParams.endDate,
    );

    return almanaxQuestMapper.toDtos(almanaxQuests);
  }
}
