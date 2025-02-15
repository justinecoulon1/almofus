import { Module } from '@nestjs/common';
import { UsersModule } from './rest/user/user.module';
import { DofusDbDataModule } from './rest/dofusdb/dofus-db-data.module';
import { AlmanaxQuestModule } from './rest/almanax-quest/almanax-quest.module';

@Module({
  imports: [UsersModule, AlmanaxQuestModule, DofusDbDataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
