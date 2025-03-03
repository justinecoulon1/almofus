import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CharacterDto, UpdateCharacterRequestDto } from '../dto/character.dto';
import characterMapper from '../mapper/character.mapper';
import { CharacterService } from './character.service';

@Controller('/character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Post('/create/:userId')
  async createCharacter(@Param('userId') userId: number): Promise<CharacterDto> {
    return characterMapper.toDto(await this.characterService.createCharacter(userId));
  }

  @Post('/update/:characterId')
  async updateCharacter(
    @Body() updateCharacterRequestDto: UpdateCharacterRequestDto,
    @Param('characterId') characterId: number,
  ): Promise<CharacterDto> {
    return characterMapper.toDto(await this.characterService.updateCharacter(characterId, updateCharacterRequestDto));
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<CharacterDto> {
    return characterMapper.toDto(await this.characterService.getCharacterById(id));
  }
}
