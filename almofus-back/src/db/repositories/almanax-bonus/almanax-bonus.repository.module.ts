import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { AlmanaxBonusRepository } from './almanax-bonus.repository';

@Module({
  imports: [DatabaseModule],
  providers: [AlmanaxBonusRepository],
  exports: [AlmanaxBonusRepository],
})
export class AlmanaxBonusRepositoryModule {}
