import { almofusAxios } from './almofus-axios';
import { AlmanaxQuestDto } from './dto/almanax-quest.dto';

class AlmanaxQuestRequestProcessor {
  async getAlmanaxQuestByDate(date: string) {
    const response = await almofusAxios.get<AlmanaxQuestDto>(`/quests?date=${date}`);
    return response.data;
  }

  async getAlmanaxQuestByDateRange(startDate: string, endDate: string) {
    const response = await almofusAxios.get<AlmanaxQuestDto[]>(
      `/quests/date-range?startDate=${startDate}&endDate=${endDate}`,
    );
    return response.data;
  }
}

export default new AlmanaxQuestRequestProcessor();
