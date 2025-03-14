import { Module } from '@nestjs/common';
import { AlmanaxQuestRepositoryModule } from 'src/db/repositories/almanax-quest/almanax-quest.repository.module';
import { AlmanaxDaysService } from './almanax-days.service';
import { AlmanaxDaysController } from './almanax-days.controller';
import { CharacterRepositoryModule } from '../../db/repositories/character/character.repository.module';
import { AlmanaxDayRepositoryModule } from '../../db/repositories/almanax-day/almanax-day.repository.module';

@Module({
  imports: [AlmanaxQuestRepositoryModule, CharacterRepositoryModule, AlmanaxDayRepositoryModule],
  controllers: [AlmanaxDaysController],
  providers: [AlmanaxDaysService],
  exports: [AlmanaxDaysService],
})
export class AlmanaxDaysModule {}
