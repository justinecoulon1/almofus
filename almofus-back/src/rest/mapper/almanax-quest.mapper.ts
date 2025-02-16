import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';
import { AlmanaxQuestDto } from '../dto/almanax-quest.dto';
import almanaxBonusMapper from './almanax-bonus.mapper';
import itemMapper from './item.mapper';
import labelMapper from './label.mapper';
import npcMapper from './npc.mapper';

const kamaRewardMultiplicator = 21990;

class AlmanaxQuestMapper {
  toDto(entity: AlmanaxQuest, year: number): AlmanaxQuestDto {
    return {
      id: entity.id,
      date: entity.date,
      year: year,
      itemQuantity: entity.itemQuantity,
      kamasReward: entity.kamasReward * kamaRewardMultiplicator,
      npc: npcMapper.toDto(entity.npc),
      item: itemMapper.toDto(entity.item),
      almanaxBonus: almanaxBonusMapper.toDto(entity.almanaxBonus),
      nameLabel: labelMapper.toDto(entity.nameLabel),
    };
  }

  toDtos(entities: AlmanaxQuest[], year: number): AlmanaxQuestDto[] {
    return entities.map((entity) => this.toDto(entity, year));
  }
}

export default new AlmanaxQuestMapper();
