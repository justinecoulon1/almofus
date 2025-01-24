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

@Injectable()
export class DofusDbDataService {
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
    this.dofusDbNpcDtos = syncRequestDto.dofusDbNpcDtos;
    this.dofusDbItemDtos = syncRequestDto.dofusDbItemDtos;
    this.dofusDbAlmanaxBonusDtos = syncRequestDto.dofusDbAlmanaxBonusDtos;
    this.dofusDbQuestDto = syncRequestDto.dofusDbQuestDto;

    const almanaxQuestEntities = this.dofusDbQuestDto.map((questDto) =>
      this.mapQuestDtoToEntity(questDto),
    );
  }

  mapQuestDtoToEntity(questDto: DofusDbQuestDto): AlmanaxQuest {
    const dofusDbItemDto: DofusDbItemDto = this.findItemById(
      questDto.steps.objectives[0].need.generated.items[0],
    );
    const item: Item = {
      dofusId: dofusDbItemDto.id,
      level: dofusDbItemDto.level,
      nameLabel: dofusDbItemDto.nameLabelDto,
    };

    return {
      itemQuantity: questDto.steps.objectives[0].need.generated.quantities[0],
      dofusNpcId: questDto.steps.objectives[3].parameters.parameter0,
      kamaReward: questDto.steps.rewards[0].kamaRatio,
      item: item,
    };
  }

  findItemById(id: number): DofusDbItemDto {
    return this.dofusDbItemDtos.find((item) => item.id === id);
  }
}
