import { Injectable } from '@nestjs/common';
import { User } from 'src/db/model/user.entity';
import { CompleteUserDto, UserDto } from 'src/rest/dto/user.dto';

@Injectable()
export class UserMapper {
  toDto(entity: User): UserDto {
    return {
      id: entity.id,
      name: entity.name,
    };
  }

  async toCompleteDto(entity: User): Promise<CompleteUserDto> {
    const alamanaxDays = (await entity.characters).map((c) => c.almanaxDays);
    await Promise.all(alamanaxDays);
    return {
      ...this.toDto(entity),
      characters: await entity.characters,
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
