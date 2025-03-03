import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { UserRepositoryModule } from '../../../db/repositories/user/user.repository.module';

@Module({
  imports: [JwtModule.register({}), UserRepositoryModule],
  providers: [PasswordService, TokenService],
  exports: [PasswordService, TokenService],
})
export class AuthModule {}
