import { AlmanaxQuestDto } from '../dto/almanax-quest.dto';
import almanaxBonusMapper from './almanax-bonus.mapper';
import itemMapper from './item.mapper';
import labelMapper from './label.mapper';
import npcMapper from './npc.mapper';
import { AlmanaxQuestWithYear } from '../almanax-quest/types/types';

const kamaRewardMultiplicator = 21990;

class AlmanaxQuestMapper {
  toDto(entity: AlmanaxQuestWithYear): AlmanaxQuestDto {
    return {
      id: entity.id,
      date: entity.date,
      year: entity.year,
      itemQuantity: entity.itemQuantity,
      kamasReward: entity.kamasReward * kamaRewardMultiplicator,
      npc: npcMapper.toDto(entity.npc),
      item: itemMapper.toDto(entity.item),
      almanaxBonus: almanaxBonusMapper.toDto(entity.almanaxBonus),
      nameLabel: labelMapper.toDto(entity.nameLabel),
    };
  }

  toDtos(entities: AlmanaxQuestWithYear[]): AlmanaxQuestDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}

export default new AlmanaxQuestMapper();
