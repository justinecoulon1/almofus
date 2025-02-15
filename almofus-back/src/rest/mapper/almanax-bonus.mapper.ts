import { AlmanaxBonus } from 'src/db/model/almanax-bonus.entity';
import { AlmanaxBonusDto } from '../dto/almanax-bonus.dto';
import labelMapper from './label.mapper';

class AlmanaxBonusMapper {
  toDto(entity: AlmanaxBonus): AlmanaxBonusDto {
    return {
      descLabel: labelMapper.toDto(entity.descLabel),
      nameLabel: labelMapper.toDto(entity.nameLabel),
    };
  }

  toDtos(entities: AlmanaxBonus[]): AlmanaxBonusDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}

export default new AlmanaxBonusMapper();
