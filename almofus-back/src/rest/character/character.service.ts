import { Injectable, NotFoundException } from '@nestjs/common';
import { Character } from 'src/db/model/character.entity';
import { CharacterRepository } from 'src/db/repositories/character/character.repository';
import { UserService } from '../user/user.service';
import { UpdateCharacterRequestDto } from '../dto/character.dto';
import { TransactionService } from '../../db/utils/transaction.service';
import { AlmanaxDaysService } from '../almanax-days/almanax-days.service';

@Injectable()
export class CharacterService {
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
    private readonly almanaxDaysService: AlmanaxDaysService,
  ) {}

  async createCharacter(userId: number): Promise<Character> {
    const { createdCharacter, almanaxDays } = await this.transactionService.wrapInTransaction(async () => {
      const user = await this.userService.getUserById(userId);
      const newCharacter = new Character('', user, 0, 0);
      const createdCharacter = await this.characterRepository.save(newCharacter);
      const almanaxDays = await this.almanaxDaysService.createAlmanaxDays(createdCharacter.id);
      return { createdCharacter, almanaxDays };
    });

    return createdCharacter;
  }

  async updateCharacter(
    characterId: number,
    updateCharacterRequestDto: UpdateCharacterRequestDto,
  ): Promise<Character[]> {
    const existingCharacter = await this.characterRepository.findById(characterId);

    if (!existingCharacter) {
      throw new NotFoundException();
    }
    const updatedCharacter: Character = { ...existingCharacter, ...updateCharacterRequestDto };
    await this.characterRepository.save(updatedCharacter);
    return this.getCharactersByUser(1);
  }

  async getCharactersByUser(userId: number): Promise<Character[]> {
    const user = await this.userService.getUserById(userId);
    return this.characterRepository.findByUser(user);
  }

  getCharacterById(id: number): Promise<Character> {
    return this.characterRepository.findById(id);
  }

  async removeCharacter(id: number): Promise<Character> {
    const character = await this.characterRepository.findById(id);
    return this.characterRepository.removeCharacter(character);
  }
}
