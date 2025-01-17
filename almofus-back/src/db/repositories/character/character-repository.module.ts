import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { CharacterRepository } from './character-repository';

@Module({
  imports: [DatabaseModule],
  providers: [CharacterRepository],
  exports: [CharacterRepository],
})
export class CharacterRepositoryModule { }
