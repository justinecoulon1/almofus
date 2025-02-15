import { AlmanaxQuest } from 'src/db/model/almanax-quest.entity';
import { AlmanaxQuestDto } from '../dto/almanax-quest.dto';
import labelMapper from './label.mapper';
import almanaxBonusMapper from './almanax-bonus.mapper';
import itemMapper from './item.mapper';
import npcMapper from './npc.mapper';

const kamaRewardMultiplicator = 21990;

class AlmanaxQuestMapper {
  toDto(entity: AlmanaxQuest): AlmanaxQuestDto {
    return {
      id: entity.id,
      date: entity.date,
      itemQuantity: entity.itemQuantity,
      kamasReward: entity.kamasReward * kamaRewardMultiplicator,
      npc: npcMapper.toDto(entity.npc),
      item: itemMapper.toDto(entity.item),
      almanaxBonus: almanaxBonusMapper.toDto(entity.almanaxBonus),
      nameLabel: labelMapper.toDto(entity.nameLabel),
    };
  }

  toDtos(entities: AlmanaxQuest[]): AlmanaxQuestDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}

export default new AlmanaxQuestMapper();
