import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { AlmanaxQuestRepository } from './almanax-quest.repository';

@Module({
  imports: [DatabaseModule],
  providers: [AlmanaxQuestRepository],
  exports: [AlmanaxQuestRepository],
})
export class AlmanaxQuestRepositoryModule { }
