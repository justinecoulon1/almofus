import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';
import { Label } from 'src/db/model/label.entity';
import { DofusDbQuestDto } from '../dto/dofus-db.dto';
import { updateLabel } from './dofus-db-label.utils';
import { AlmanaxBonus } from 'src/db/model/almanax-bonus.entity';
import { Item } from 'src/db/model/item.entity';
import { Npc } from 'src/db/model/npc.entity';

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
  updateAlmanaxQuest(existingQuest, dofusDbQuestDto);
  return existingQuest;
}

export function updateAlmanaxQuest(existingQuest: AlmanaxQuest, dofusDbQuestDto: DofusDbQuestDto) {
  new Date();
  dofusDbQuestDto.steps[0].objectives[0].need.generated.quantities[0];
  dofusDbQuestDto.steps[0].rewards[0].kamasRatio;
  updateLabel(existingQuest.nameLabel, dofusDbQuestDto.name);
}

export function mapAlmanaxQuestDtoToEntity(
  dofusDbQuestDto: DofusDbQuestDto,
  npc: Npc,
  item: Item,
  almanaxBonus: AlmanaxBonus,
): AlmanaxQuest {
  const questNameLabel = new Label(dofusDbQuestDto.name.fr, dofusDbQuestDto.name.en);
  return new AlmanaxQuest(
    dofusDbQuestDto.id,
    new Date(),
    dofusDbQuestDto.steps[0].objectives[0].need.generated.quantities[0],
    dofusDbQuestDto.steps[0].rewards[0].kamasRatio,
    npc,
    item,
    almanaxBonus,
    questNameLabel,
  );
}
