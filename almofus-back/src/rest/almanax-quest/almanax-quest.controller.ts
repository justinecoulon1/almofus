import { Controller, Get, Query } from '@nestjs/common';
import { AlmanaxQuestService } from './almanax-quest.service';
import { GetAlmanaxQuestByDateQueryParamsDto } from '../dto/almanax-quest.dto';
import almanaxQuestMapper from '../mapper/almanax-quest.mapper';

@Controller('/quests')
export class AlmanaxQuestController {
  constructor(private readonly almanaxQuestService: AlmanaxQuestService) {}

  @Get()
  async getAlmanaxQuestByDate(@Query() queryParams: GetAlmanaxQuestByDateQueryParamsDto) {
    const almanaxQuest = await this.almanaxQuestService.getAlmanaxQuestByDate(queryParams.date, queryParams.year);
    return almanaxQuestMapper.toDto(almanaxQuest);
  }
}
