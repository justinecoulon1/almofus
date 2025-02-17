import { Module } from '@nestjs/common';
import { CharacterRepositoryModule } from 'src/db/repositories/character/character.repository.module';
import { UserModule } from '../user/user.module';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
  imports: [UserModule, CharacterRepositoryModule],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
