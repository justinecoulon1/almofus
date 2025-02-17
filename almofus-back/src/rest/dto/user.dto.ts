import { CharacterDto } from './character.dto';

export type CreateUserRequestDto = {
  email: string;
  name: string;
  password: string;
};

export type UserDto = {
  id: number;
  name: string;
};

export type CompleteUserDto = UserDto & {
  characters: CharacterDto[];
};

export type LoginRequestDto = {
  email: string;
  password: string;
};
