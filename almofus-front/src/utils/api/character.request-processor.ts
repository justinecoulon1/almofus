import { almofusAxios } from './almofus-axios';
import { CharacterDto } from './dto/character.dto';

class CharacterRequestProcessor {
  async createCharacter(userId: number) {
    const response = await almofusAxios.post<CharacterDto>(`/character/create/${userId}`);
    return response.data;
  }
}

export default new CharacterRequestProcessor();
