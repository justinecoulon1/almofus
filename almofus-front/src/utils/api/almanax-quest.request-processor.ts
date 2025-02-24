import { almofusAxios } from './almofus-axios';
import { AlmanaxQuestDto } from './dto/almanax-quest.dto';

class AlmanaxQuestRequestProcessor {
  async getAlmanaxQuestByDate(date: string, year: number) {
    const response = await almofusAxios.get<AlmanaxQuestDto>(`/quests?date=${date}&year=${year}`);
    return response.data;
  }
}

export default new AlmanaxQuestRequestProcessor();
