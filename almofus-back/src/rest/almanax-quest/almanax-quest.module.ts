import { Module } from '@nestjs/common';
import { AlmanaxQuestRepositoryModule } from 'src/db/repositories/almanax-quest/almanax-quest.repository.module';
import { AlmanaxQuestController } from './almanax-quest.controller';
import { AlmanaxQuestService } from './almanax-quest.service';
import { AlmanaxMobileDateRepositoryModule } from 'src/db/repositories/almanax-mobile-date/almanax-mobile-date.repository.module';

@Module({
  imports: [AlmanaxQuestRepositoryModule, AlmanaxMobileDateRepositoryModule],
  controllers: [AlmanaxQuestController],
  providers: [AlmanaxQuestService],
  exports: [AlmanaxQuestService],
})
export class AlmanaxQuestModule {}
