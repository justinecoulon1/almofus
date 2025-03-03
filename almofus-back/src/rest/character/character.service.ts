import { Injectable, NotFoundException } from '@nestjs/common';
import { Character } from 'src/db/model/character.entity';
import { CharacterRepository } from 'src/db/repositories/character/character.repository';
import { UserService } from '../user/user.service';
import { UpdateCharacterRequestDto } from '../dto/character.dto';

@Injectable()
export class CharacterService {
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly userService: UserService,
  ) {}

  async createCharacter(userId: number): Promise<Character> {
    const user = await this.userService.getUserById(userId);
    const newCharacter = new Character('', user, 0, 0);
    return this.characterRepository.save(newCharacter);
  }

  async updateCharacter(characterId: number, updateCharacterRequestDto: UpdateCharacterRequestDto): Promise<Character> {
    const existingCharacter = await this.characterRepository.findById(characterId);

    if (!existingCharacter) {
      throw new NotFoundException();
    }
    const updatedCharacter: Character = { ...existingCharacter, ...updateCharacterRequestDto };
    return this.characterRepository.save(updatedCharacter);
  }

  getCharacterById(id: number): Promise<Character> {
    return this.characterRepository.findById(id);
  }
}
