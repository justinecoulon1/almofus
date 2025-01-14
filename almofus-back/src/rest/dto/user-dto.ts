export type GetUsersResponseDto = {
  users: UserDto[];
};

export type CreateUserRequestDto = {
  email: String,
  name: String,

}

export type UserDto = {
  name: String;
};
