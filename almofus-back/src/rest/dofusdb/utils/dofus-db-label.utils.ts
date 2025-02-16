import sanitizeHtml from 'sanitize-html';
import { Label } from 'src/db/model/label.entity';
import { DofusDbLabelDto } from '../dto/dofus-db.dto';

const sanitizeHtmlConfig: sanitizeHtml.IOptions = { allowedTags: [] };

export function updateLabel(existingLabel: Label, dofusDbLabelDto: DofusDbLabelDto) {
  existingLabel.en = sanitizeHtml(dofusDbLabelDto.en, sanitizeHtmlConfig);
  existingLabel.fr = sanitizeHtml(dofusDbLabelDto.fr, sanitizeHtmlConfig);
}

export function createLabel(dofusDbLabelDto: DofusDbLabelDto): Label {
  return new Label(
    sanitizeHtml(dofusDbLabelDto.fr, sanitizeHtmlConfig),
    sanitizeHtml(dofusDbLabelDto.en, sanitizeHtmlConfig),
  );
}
