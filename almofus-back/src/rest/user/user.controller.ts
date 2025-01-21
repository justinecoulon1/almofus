import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/db/model/user.entity';
import { UserMapper } from './user.mapper';
import { UserDto } from '../dto/user.dto';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) { }

  @Get('/all')
  async getUsers(): Promise<UserDto[]> {
    return this.userMapper.toDtos(await this.userService.getUsers());
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<UserDto> {
    return this.userMapper.toCompleteDto(
      await this.userService.getUserById(id),
    );
  }

  @Post('/create')
  async createUser(@Body() user: UserDto): Promise<UserDto> {
    return this.userMapper.toCompleteDto(
      await this.userService.createUser(user.name),
    );
  }
}
