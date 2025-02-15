import { Npc } from 'src/db/model/npc.entity';
import { NpcDto } from '../dto/npc.dto';
import labelMapper from './label.mapper';

class NpcMapper {
  toDto(entity: Npc): NpcDto {
    return {
      id: entity.id,
      dofusId: entity.dofusId,
      nameLabel: labelMapper.toDto(entity.nameLabel),
    };
  }

  toDtos(entities: Npc[]): NpcDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}

export default new NpcMapper();
