import { Module } from '@nestjs/common';
import { DofusDbDataController } from './dofus-db-data.controller';
import { DofusDbDataService } from './dofus-db-data.service';
import { ItemRepositoryModule } from 'src/db/repositories/item/item.repository.module';
import { AlmanaxQuestRepositoryModule } from 'src/db/repositories/almanax-quest/almanax-quest.repository.module';
import { LabelRepositoryModule } from 'src/db/repositories/label/label.repository.module';

@Module({
    imports: [ItemRepositoryModule, AlmanaxQuestRepositoryModule, LabelRepositoryModule],
    controllers: [DofusDbDataController],
    providers: [DofusDbDataService],
})
export class DofusDbDataModule { }
