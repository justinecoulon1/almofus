import { Module } from '@nestjs/common';
import { DofusDbDataController } from './dofus-db-data.controller';
import { DofusDbDataService } from './dofus-db-data.service';
import { ItemRepositoryModule } from 'src/db/repositories/item/item.repository.module';
import { AlmanaxQuestRepositoryModule } from 'src/db/repositories/almanax-quest/almanax-quest.repository.module';
import { LabelRepositoryModule } from 'src/db/repositories/label/label.repository.module';
import { NpcRepositoryModule } from 'src/db/repositories/npc/npc.repository.module';
import { AlmanaxBonusRepositoryModule } from 'src/db/repositories/almanax-bonus/almanax-bonus.repository.module';

@Module({
  imports: [
    ItemRepositoryModule,
    AlmanaxQuestRepositoryModule,
    LabelRepositoryModule,
    NpcRepositoryModule,
    AlmanaxBonusRepositoryModule,
  ],
  controllers: [DofusDbDataController],
  providers: [DofusDbDataService],
})
export class DofusDbDataModule {}
