import { User } from 'src/db/model/user.entity';
import { CompleteUserDto, UserDto } from 'src/rest/dto/user.dto';
import characterMapper from './character.mapper';

class UserMapper {
  toDto(entity: User): UserDto {
    return {
      id: entity.id,
      name: entity.name,
    };
  }

  async toCompleteDto(entity: User): Promise<CompleteUserDto> {
    return {
      ...this.toDto(entity),
      characters: characterMapper.toDtos(await entity.characters),
    };
  }

  toDtos(entities: User[]): UserDto[] {
    return entities.map((entity) => this.toDto(entity));
  }

  async toCompleteDtos(entities: User[]): Promise<CompleteUserDto[]> {
    const dtoPromises = entities.map((entity) => this.toCompleteDto(entity));
    const dtos = await Promise.all(dtoPromises);
    return dtos;
  }
}

export default new UserMapper();
