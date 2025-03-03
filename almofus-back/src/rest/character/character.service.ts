import { Injectable } from '@nestjs/common';
import { Character } from 'src/db/model/character.entity';
import { CharacterRepository } from 'src/db/repositories/character/character.repository';
import { UserService } from '../user/user.service';

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
}
