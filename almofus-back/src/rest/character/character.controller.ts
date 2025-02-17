import { Controller, Param, Post } from '@nestjs/common';
import { CharacterDto } from '../dto/character.dto';
import characterMapper from '../mapper/character.mapper';
import { CharacterService } from './character.service';

@Controller('/character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Post('/create/:userId')
  async createCharacter(@Param('userId') userId: number): Promise<CharacterDto> {
    return characterMapper.toDto(await this.characterService.createCharacter(userId));
  }
}
