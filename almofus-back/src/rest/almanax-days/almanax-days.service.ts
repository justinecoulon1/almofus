import { Injectable } from '@nestjs/common';
import { AlmanaxQuestRepository } from 'src/db/repositories/almanax-quest/almanax-quest.repository';
import { AlmanaxDay } from '../../db/model/almanax-day.entity';
import { CharacterRepository } from '../../db/repositories/character/character.repository';
import { AlmanaxDayRepository } from '../../db/repositories/almanax-day/almanax-day.repository';

@Injectable()
export class AlmanaxDaysService {
  constructor(
    private readonly almanaxQuestRepository: AlmanaxQuestRepository,
    private readonly characterRepository: CharacterRepository,
    private readonly almanaxDaysRepository: AlmanaxDayRepository,
  ) {}

  async createAlmanaxDays(characterId: number): Promise<AlmanaxDay[]> {
    const allQuests = await this.almanaxQuestRepository.findAll();
    const character = await this.characterRepository.findById(characterId);
    const days = allQuests.map((quest) => new AlmanaxDay(false, character, quest));
    return await this.almanaxDaysRepository.saveCharacterAlmanaxDays(days);
  }
}
