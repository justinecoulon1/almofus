import { Label } from 'src/db/model/label.entity';
import { LabelDto } from '../dto/label.dto';

class LabelMapper {
  toDto(entity: Label): LabelDto {
    return {
      fr: entity.fr,
      en: entity.en,
    };
  }

  toDtos(entities: Label[]): LabelDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}

export default new LabelMapper();
