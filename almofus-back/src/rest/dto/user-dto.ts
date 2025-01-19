import { Character } from 'src/db/model/character.entity';

export type CreateUserRequestDto = {
  email: string;
  name: string;
};

export type UserDto = {
  id: number;
  name: string;
};

export type CompleteUserDto = UserDto & {
  characters: Character[];
};
