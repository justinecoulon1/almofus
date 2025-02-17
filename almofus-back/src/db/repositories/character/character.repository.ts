import { Inject, Injectable } from '@nestjs/common';
import { Character } from 'src/db/model/character.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CharacterRepository {
  private repository: Repository<Character>;

  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(Character);
  }

  save(character: Character): Promise<Character> {
    return this.repository.save(character);
  }
}
