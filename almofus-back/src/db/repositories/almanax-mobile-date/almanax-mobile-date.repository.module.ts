import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { AlmanaxMobileDateRepository } from './almanax-mobile-date.repository';

@Module({
  imports: [DatabaseModule],
  providers: [AlmanaxMobileDateRepository],
  exports: [AlmanaxMobileDateRepository],
})
export class AlmanaxMobileDateRepositoryModule {}
