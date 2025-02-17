import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserRequestDto, UserDto } from '../dto/user.dto';
import userMapper from '../mapper/user.mapper';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async getUsers(): Promise<UserDto[]> {
    return userMapper.toDtos(await this.userService.getUsers());
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<UserDto> {
    return userMapper.toCompleteDto(await this.userService.getUserById(id));
  }

  @Post('/create')
  async createUser(@Body() createUserRequestDto: CreateUserRequestDto): Promise<UserDto> {
    return userMapper.toCompleteDto(
      await this.userService.createUser(createUserRequestDto.name, createUserRequestDto.email),
    );
  }
}
