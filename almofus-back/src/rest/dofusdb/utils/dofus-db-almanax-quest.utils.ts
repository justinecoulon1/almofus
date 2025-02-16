import { AlmanaxBonus } from 'src/db/model/almanax-bonus.entity';
import { AlmanaxQuest, MobileEvent } from 'src/db/model/almanax-quest.entity';
import { Item } from 'src/db/model/item.entity';
import { Npc } from 'src/db/model/npc.entity';
import almanaxQuestsDateInfo from 'src/rest/dofusdb/utils/Almanax.json';
import { DofusDbQuestDto } from '../dto/dofus-db.dto';
import { AlmanaxQuestDateInfo } from './almanax-quest-date-info';
import { createLabel, updateLabel } from './dofus-db-label.utils';

export function getAlmanaxQuest(
  questById: Record<number, AlmanaxQuest>,
  dofusDbQuestDto: DofusDbQuestDto,
  npc: Npc,
  item: Item,
  almanaxBonus: AlmanaxBonus,
): AlmanaxQuest {
  const existingQuest = questById[dofusDbQuestDto.id];
  if (!existingQuest) {
    return mapAlmanaxQuestDtoToEntity(dofusDbQuestDto, npc, item, almanaxBonus);
  }
  updateAlmanaxQuest(existingQuest, dofusDbQuestDto, npc, item, almanaxBonus);
  return existingQuest;
}

export function updateAlmanaxQuest(
  existingQuest: AlmanaxQuest,
  dofusDbQuestDto: DofusDbQuestDto,
  npc: Npc,
  item: Item,
  almanaxBonus: AlmanaxBonus,
) {
  const questDateInfo = getAlmanaxQuestDateInfoByNpcId(npc.dofusId);
  existingQuest.date = questDateInfo?.date || null;
  existingQuest.mobileEvent = (questDateInfo?.mobileInfo as MobileEvent) || null;
  existingQuest.itemQuantity = dofusDbQuestDto.steps[0].objectives[0].need.generated.quantities[0];
  existingQuest.kamasReward = dofusDbQuestDto.steps[0].rewards[0].kamasRatio;
  existingQuest.npc = npc;
  existingQuest.item = item;
  existingQuest.almanaxBonus = almanaxBonus;
  updateLabel(existingQuest.nameLabel, dofusDbQuestDto.name);
}

export function mapAlmanaxQuestDtoToEntity(
  dofusDbQuestDto: DofusDbQuestDto,
  npc: Npc,
  item: Item,
  almanaxBonus: AlmanaxBonus,
): AlmanaxQuest {
  const questNameLabel = createLabel(dofusDbQuestDto.name);
  const questDateInfo = getAlmanaxQuestDateInfoByNpcId(npc.dofusId);
  return new AlmanaxQuest(
    dofusDbQuestDto.id,
    questDateInfo?.date || null,
    dofusDbQuestDto.steps[0].objectives[0].need.generated.quantities[0],
    dofusDbQuestDto.steps[0].rewards[0].kamasRatio,
    npc,
    item,
    almanaxBonus,
    questNameLabel,
    (questDateInfo?.mobileInfo as MobileEvent) || null,
  );
}

function getAlmanaxQuestDateInfoByNpcId(npcId: number): AlmanaxQuestDateInfo | undefined {
  return almanaxQuestsDateInfo.find((questInfo) => npcId === questInfo.npcId);
}
