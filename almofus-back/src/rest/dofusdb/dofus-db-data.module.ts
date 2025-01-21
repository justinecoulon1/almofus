import { Module } from '@nestjs/common';
import { DofusDbDataController } from './dofus-db-data.controller';
import { DofusDbDataService } from './dofus-db-data.service';

@Module({
    imports: [],
    controllers: [DofusDbDataController],
    providers: [DofusDbDataService],
})
export class DofusDbDataModule { }
