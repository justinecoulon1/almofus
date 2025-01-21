import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositoryModule } from 'src/db/repositories/user/user-repository.module';
import { UserMapper } from './user.mapper';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [UserService, UserMapper],
  exports: [UserService, UserMapper],
})
export class UsersModule { }
