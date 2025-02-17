import { Module } from '@nestjs/common';
import { AlmanaxQuestModule } from './rest/almanax-quest/almanax-quest.module';
import { CharacterModule } from './rest/character/character.module';
import { DofusDbDataModule } from './rest/dofusdb/dofus-db-data.module';
import { UserModule } from './rest/user/user.module';

@Module({
  imports: [UserModule, CharacterModule, AlmanaxQuestModule, DofusDbDataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
