import { Controller, Get, Param, Post } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('/character')
export class CharacterController {
    constructor(private characterService: CharacterService) { }

}
