import { Injectable } from '@nestjs/common';
import { CharacterRepository } from 'src/db/repositories/character/character.repository';

@Injectable()
export class CharacterService {
    constructor(private readonly characterRepository: CharacterRepository) { }

}
