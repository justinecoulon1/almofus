import { LabelDto } from './label.dto';

export type ItemDto = {
  id: number;
  dofusId: number;
  level: number;
  iconId: number;
  nameLabel: LabelDto;
};
