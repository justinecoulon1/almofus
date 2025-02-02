import { Label } from 'src/db/model/label.entity';
import { DofusDbLabelDto } from '../dto/dofus-db.dto';

export function updateLabel(
  existingLabel: Label,
  dofusDbLabelDto: DofusDbLabelDto,
) {
  existingLabel.en = dofusDbLabelDto.en;
  existingLabel.fr = dofusDbLabelDto.fr;
}
