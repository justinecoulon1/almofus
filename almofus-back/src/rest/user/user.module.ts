import { Module } from '@nestjs/common';
import { UserRepositoryModule } from 'src/db/repositories/user/user.repository.module';
import { AuthModule } from '../utils/auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserRepositoryModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
