import { BadRequestException, Injectable } from '@nestjs/common';
import { AlmanaxQuestRepository } from 'src/db/repositories/almanax-quest/almanax-quest.repository';
import { ItemRepository } from 'src/db/repositories/item/item.repository';
import { DofusDbQuestDto, SyncRequestDto } from './dto/dofus-db.dto';
import { AlmanaxQuest, MobileEvent } from 'src/db/model/almanax-quest.entity';
import { Item } from 'src/db/model/item.entity';
import { Npc } from 'src/db/model/npc.entity';
import { AlmanaxBonus } from 'src/db/model/almanax-bonus.entity';
import { getSyncDofusDbData } from './utils/dofus-db.utils';
import { getItem, getItemDtoById } from './utils/dofus-db-item.utils';
import { getNpc, getNpcDtoById } from './utils/dofus-db-npc.utils';
import { getAlmanaxBonus, getAlmanaxBonusDtoById } from './utils/dofus-db-almanax-bonus.utils';
import { AlmanaxBonusRepository } from 'src/db/repositories/almanax-bonus/almanax-bonus.repository';
import { NpcRepository } from 'src/db/repositories/npc/npc.repository';
import { getAlmanaxQuest } from './utils/dofus-db-almanax-quest.utils';
import { AlmanaxMobileDateRepository } from 'src/db/repositories/almanax-mobile-date/almanax-mobile-date.repository';
import { AlmanaxMobileDate } from 'src/db/model/almanax-mobile-date.entity';
import { getMobileDates as getMobileDates } from './utils/almanax-quest-date.utils';

@Injectable()
export class DofusDbDataService {
  private isSyncStarted = false;

  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly almanaxQuestRepository: AlmanaxQuestRepository,
    private readonly almanaxBonusRepository: AlmanaxBonusRepository,
    private readonly npcRepository: NpcRepository,
    private readonly almanaxMobileDateRepository: AlmanaxMobileDateRepository,
  ) {}

  async syncDofusDbData() {
    if (this.isSyncStarted) {
      throw new BadRequestException('Sync already started');
    } else {
      try {
        this.isSyncStarted = true;
        const syncRequestDto = await getSyncDofusDbData();
        const dofusDbQuestDtos = syncRequestDto.dofusDbQuestDtos;

        const allItems = await this.itemRepository.findAll();
        const allNpcs = await this.npcRepository.findAll();
        const allAlmanaxBonuses = await this.almanaxBonusRepository.findAll();
        const allAlmanaxQuests = await this.almanaxQuestRepository.findAll();

        const itemById: Record<number, Item> = {};
        allItems.forEach((item) => (itemById[item.dofusId] = item));
        const npcById: Record<number, Npc> = {};
        allNpcs.forEach((npc) => (npcById[npc.dofusId] = npc));
        const almanaxBonusByNpcId: Record<number, AlmanaxBonus> = {};
        allAlmanaxBonuses.forEach((almanaxBonus) => (almanaxBonusByNpcId[almanaxBonus.npcId] = almanaxBonus));
        const almanaxQuestById: Record<number, AlmanaxQuest> = {};
        allAlmanaxQuests.forEach((almanaxQuest) => (almanaxQuestById[almanaxQuest.dofusId] = almanaxQuest));

        const almanaxQuestEntities = dofusDbQuestDtos
          .filter((questDto) => questDto.name.fr.startsWith('Offrande à'))
          .map((questDto) =>
            this.getUpdatedQuest(syncRequestDto, questDto, itemById, npcById, almanaxBonusByNpcId, almanaxQuestById),
          );

        await this.almanaxQuestRepository.createAlmanaxQuests(almanaxQuestEntities);
      } finally {
        this.isSyncStarted = false;
      }
    }
  }

  private getUpdatedQuest(
    syncRequestDto: SyncRequestDto,
    dofusDbQuestDto: DofusDbQuestDto,
    itemById: Record<number, Item>,
    npcById: Record<number, Npc>,
    almanaxBonusByNpcId: Record<number, AlmanaxBonus>,
    almanaxQuestById: Record<number, AlmanaxQuest>,
  ): AlmanaxQuest {
    const dofusDbNpcDtos = syncRequestDto.dofusDbNpcDtos;
    const dofusDbItemDtos = syncRequestDto.dofusDbItemDtos;
    const dofusDbAlmanaxBonusDtos = syncRequestDto.dofusDbAlmanaxBonusDtos;

    const dofusDbItemDtoId = dofusDbQuestDto.steps[0].objectives[0].need.generated.items[0];
    const dofusDbNpcDtoId = dofusDbQuestDto.steps[0].objectives[2].parameters.parameter0;

    const dofusDbItemDto = getItemDtoById(dofusDbItemDtos, dofusDbItemDtoId);
    const dofusDbNpcDto = getNpcDtoById(dofusDbNpcDtos, dofusDbNpcDtoId);
    const dofusDbAlmanaxBonusDto = getAlmanaxBonusDtoById(dofusDbAlmanaxBonusDtos, dofusDbNpcDtoId);

    const item = getItem(itemById, dofusDbItemDto);
    const npc = getNpc(npcById, dofusDbNpcDto);
    const almanaxBonus = getAlmanaxBonus(almanaxBonusByNpcId, dofusDbAlmanaxBonusDto);
    const almanaxQuest = getAlmanaxQuest(almanaxQuestById, dofusDbQuestDto, npc, item, almanaxBonus);

    return almanaxQuest;
  }

  async initMobileDates(year: number) {
    const mobileDates = await this.almanaxMobileDateRepository.findByYear(year);
    if (mobileDates?.length !== 0) {
      throw new BadRequestException(`All mobile dates for year ${year} are already in db`);
    }
    if (year < new Date().getFullYear()) {
      throw new BadRequestException('This is in the past you sicko');
    }
    if (year > 2100) {
      throw new BadRequestException('wtf mate');
    }
    const mobileEventAlmanaxQuests = await this.almanaxQuestRepository.findMobileQuests();
    const toCreateMobileDates = getMobileDates(year, mobileEventAlmanaxQuests);
    await this.almanaxMobileDateRepository.createAlmanaxMobileDates(toCreateMobileDates);
  }
}
