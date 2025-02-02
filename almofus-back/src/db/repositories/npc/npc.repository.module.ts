import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { NpcRepository } from './npc.repository';

@Module({
  imports: [DatabaseModule],
  providers: [NpcRepository],
  exports: [NpcRepository],
})
export class NpcRepositoryModule {}
