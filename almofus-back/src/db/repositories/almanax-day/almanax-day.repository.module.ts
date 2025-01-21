import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { AlmanaxDayRepository } from './almanax-day.repository';

@Module({
  imports: [DatabaseModule],
  providers: [AlmanaxDayRepository],
  exports: [AlmanaxDayRepository],
})
export class AlmanaxDayRepositoryModule { }
