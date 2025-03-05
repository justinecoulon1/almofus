import { Inject, Injectable } from '@nestjs/common';
import { Character } from 'src/db/model/character.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../model/user.entity';

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

  findById(id: number): Promise<Character> {
    return this.repository.findOneBy({
      id,
    });
  }

  findByUser(user: User): Promise<Character[]> {
    return this.repository.findBy({ user });
  }

  removeCharacter(character: Character): Promise<Character> {
    return this.repository.remove(character, {});
  }
}
