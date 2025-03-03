import { almofusAxios } from './almofus-axios';
import { CharacterDto, UpdateCharacterRequestDto } from './dto/character.dto';

class CharacterRequestProcessor {
  async createCharacter(userId: number) {
    const response = await almofusAxios.post<CharacterDto>(`/character/create/${userId}`);
    return response.data;
  }

  async updateCharacter(characterId: number, updateCharacterRequestDto: UpdateCharacterRequestDto) {
    const response = await almofusAxios.post<CharacterDto>(
      `/character/update/${characterId}`,
      updateCharacterRequestDto,
    );
    return response.data;
  }
}

export default new CharacterRequestProcessor();
