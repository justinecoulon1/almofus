import { Item } from 'src/db/model/item.entity';
import { ItemDto } from '../dto/item.dto';
import labelMapper from './label.mapper';

class ItemMapper {
  toDto(entity: Item): ItemDto {
    return {
      id: entity.id,
      dofusId: entity.dofusId,
      level: entity.level,
      iconId: entity.iconId,
      nameLabel: labelMapper.toDto(entity.nameLabel),
    };
  }

  toDtos(entities: Item[]): ItemDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}

export default new ItemMapper();
