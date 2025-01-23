import { Body, Controller, Post } from '@nestjs/common';
import { DofusDbDataService } from './dofus-db-data.service';
import { DofusDbAlmanaxBonusDto, DofusDbItemDto, DofusDbNpcDto, DofusDbQuestDto, SyncRequestDto } from './dto/dofus-db.dto';

@Controller('/dofusdb')
export class DofusDbDataController {
    constructor(private DofusDbDataService: DofusDbDataService) { }

    @Post()
    createDofusDbData(@Body() syncRequestDto: SyncRequestDto) {

    }
}