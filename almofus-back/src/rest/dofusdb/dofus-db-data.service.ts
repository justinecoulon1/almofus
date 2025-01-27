import { Injectable } from '@nestjs/common';
import { AlmanaxQuestRepository } from 'src/db/repositories/almanax-quest/almanax-quest.repository';
import { ItemRepository } from 'src/db/repositories/item/item.repository';
import { LabelRepository } from 'src/db/repositories/label/label.repository';
import {
  DofusDbAlmanaxBonusDto,
  DofusDbItemDto,
  DofusDbNpcDto,
  DofusDbQuestDto,
  SyncRequestDto,
} from './dto/dofus-db.dto';
import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';
import { Item } from 'src/db/model/item.entity';
import { Label } from 'src/db/model/label.entity';

@Injectable()
export class DofusDbDataService {
  private isSyncStarted = false;
  private dofusDbNpcDtos: DofusDbNpcDto[] = [];
  private dofusDbItemDtos: DofusDbItemDto[] = [];
  private dofusDbAlmanaxBonusDtos: DofusDbAlmanaxBonusDto[] = [];
  private dofusDbQuestDto: DofusDbQuestDto[] = [];

  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly almanaxQuestRepository: AlmanaxQuestRepository,
    private readonly labelRepository: LabelRepository,
  ) {}

  mapDofusDbDataToEntities(syncRequestDto: SyncRequestDto) {
    if (this.isSyncStarted) {
      throw new Error('Sync already started');
    } else {
      try {
        this.isSyncStarted = true;

        this.dofusDbNpcDtos = syncRequestDto.dofusDbNpcDtos;
        this.dofusDbItemDtos = syncRequestDto.dofusDbItemDtos;
        this.dofusDbAlmanaxBonusDtos = syncRequestDto.dofusDbAlmanaxBonusDtos;
        this.dofusDbQuestDto = syncRequestDto.dofusDbQuestDto;

        const almanaxQuestEntities = this.dofusDbQuestDto.map((questDto) =>
          this.mapQuestDtoToEntity(questDto),
        );
      } finally {
        this.isSyncStarted = false;
      }
    }
  }

  mapQuestDtoToEntity(questDto: DofusDbQuestDto): AlmanaxQuest {
    const dofusDbItemDto: DofusDbItemDto = this.findItemById(
      questDto.steps.objectives[0].need.generated.items[0],
    );

    const label = new Label();
    label.fr = dofusDbItemDto.nameLabelDto.fr;
    label.en = dofusDbItemDto.nameLabelDto.en;

    const item = new Item();
    item.dofusId = dofusDbItemDto.id;
    item.level = dofusDbItemDto.level;
    item.nameLabel = Promise.resolve(label);

    return {
      itemQuantity: questDto.steps.objectives[0].need.generated.quantities[0],
      dofusNpcId: questDto.steps.objectives[3].parameters.parameter0,
      kamaReward: questDto.steps.rewards[0].kamaRatio,
      item: Promise.resolve(item),
    };
  }

  findItemById(dofusId: number): DofusDbItemDto {
    return this.dofusDbItemDtos.find((item) => item.id === dofusId);
  }
}
