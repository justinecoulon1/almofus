import { Injectable } from '@nestjs/common';
import { AlmanaxQuestRepository } from 'src/db/repositories/almanax-quest/almanax-quest.repository';
import { ItemRepository } from 'src/db/repositories/item/item.repository';
import { LabelRepository } from 'src/db/repositories/label/label.repository';
import { DofusDbAlmanaxBonusDto, DofusDbItemDto, DofusDbNpcDto, DofusDbQuestDto, SyncRequestDto } from './dto/dofus-db.dto';
import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';

@Injectable()
export class DofusDbDataService {
    constructor(private readonly itemRepository: ItemRepository,
        private readonly almanaxQuestRepository: AlmanaxQuestRepository,
        private readonly labelRepository: LabelRepository
    ) { }

}
