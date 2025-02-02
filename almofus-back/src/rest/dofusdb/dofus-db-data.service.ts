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
import { Npc } from 'src/db/model/npc.entity';
import { AlmanaxBonus } from 'src/db/model/almanax-bonus.entity';
import { getSyncDofusDbData } from './utils/dofus-db.utils';

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

  async mapDofusDbDataToEntities() {
    if (this.isSyncStarted) {
      throw new Error('Sync already started');
    } else {
      try {
        this.isSyncStarted = true;
        const syncRequestDto = await getSyncDofusDbData();

        this.dofusDbNpcDtos = syncRequestDto.dofusDbNpcDtos;
        this.dofusDbItemDtos = syncRequestDto.dofusDbItemDtos;
        this.dofusDbAlmanaxBonusDtos = syncRequestDto.dofusDbAlmanaxBonusDtos;
        this.dofusDbQuestDto = syncRequestDto.dofusDbQuestDto;

        const almanaxQuestEntities = this.dofusDbQuestDto
          .filter((questDto) => questDto.name.fr.startsWith('Offrande à'))
          .map((questDto) => this.mapQuestDtoToEntity(questDto));

        await this.almanaxQuestRepository.createAlmanaxQuests(
          almanaxQuestEntities,
        );
      } finally {
        this.isSyncStarted = false;
      }
    }
  }

  mapQuestDtoToEntity(dofusDbQuestDto: DofusDbQuestDto): AlmanaxQuest {
    const dofusDbItemDtoId =
      dofusDbQuestDto.steps[0].objectives[0].need.generated.items[0];
    const dofusDbNpcDtoId =
      dofusDbQuestDto.steps[0].objectives[2].parameters.parameter0;

    const dofusDbItemDto = this.findItemById(dofusDbItemDtoId);
    const dofusDbNpcDto = this.findNpcById(dofusDbNpcDtoId);
    const dofusDbAlmanaxBonusDto = this.findAlmanaxBonusById(dofusDbNpcDtoId);

    const itemNameLabel = new Label(
      dofusDbItemDto.name.fr,
      dofusDbItemDto.name.en,
    );

    const item = new Item(
      dofusDbItemDto.id,
      dofusDbItemDto.level,
      itemNameLabel,
    );

    const npcNameLabel = new Label(
      dofusDbNpcDto.name.fr,
      dofusDbNpcDto.name.en,
    );

    const npc = new Npc(dofusDbNpcDto.id, npcNameLabel);

    const almanaxBonusNameLabel = new Label(
      dofusDbAlmanaxBonusDto.name.fr,
      dofusDbAlmanaxBonusDto.name.en,
    );
    const almanaxBonusDescLabel = new Label(
      dofusDbAlmanaxBonusDto.desc.fr,
      dofusDbAlmanaxBonusDto.desc.en,
    );

    const almanaxBonus = new AlmanaxBonus(
      almanaxBonusNameLabel,
      almanaxBonusDescLabel,
    );

    const questNameLabel = new Label(
      dofusDbQuestDto.name.fr,
      dofusDbQuestDto.name.en,
    );

    const almanaxQuest = new AlmanaxQuest(
      new Date(),
      dofusDbQuestDto.steps[0].objectives[0].need.generated.quantities[0],
      dofusDbQuestDto.steps[0].rewards[0].kamasRatio,
      npc,
      item,
      almanaxBonus,
      questNameLabel,
    );
    return almanaxQuest;
  }

  findItemById(dofusId: number): DofusDbItemDto {
    return this.dofusDbItemDtos.find((item) => item.id === dofusId);
  }

  findNpcById(dofusId: number): DofusDbNpcDto {
    return this.dofusDbNpcDtos.find((npc) => npc.id === dofusId);
  }

  findAlmanaxBonusById(dofusId: number): DofusDbAlmanaxBonusDto {
    return this.dofusDbAlmanaxBonusDtos.find(
      (almanaxBonus) => almanaxBonus.npcId === dofusId,
    );
  }
}
