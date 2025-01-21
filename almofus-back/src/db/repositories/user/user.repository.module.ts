import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule { }
