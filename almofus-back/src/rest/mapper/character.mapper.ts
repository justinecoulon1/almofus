import { Character } from 'src/db/model/character.entity';
import { CharacterDto } from '../dto/character.dto';

class CharacterMapper {
  toDto(entity: Character): CharacterDto {
    return {
      id: entity.id,
      name: entity.name,
      profilePictureId: entity.profilePictureId,
    };
  }

  toDtos(entities: Character[]): CharacterDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}

export default new CharacterMapper();
