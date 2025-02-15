import { Item } from 'src/db/model/item.entity';
import { DofusDbItemDto } from '../dto/dofus-db.dto';
import { Label } from 'src/db/model/label.entity';
import { updateLabel } from './dofus-db-label.utils';

export function getItem(itemById: Record<number, Item>, dofusDbItemDto: DofusDbItemDto): Item {
  const existingItem = itemById[dofusDbItemDto.id];
  if (!existingItem) {
    return mapItemDtoToEntity(dofusDbItemDto);
  }
  updateItem(existingItem, dofusDbItemDto);
  return existingItem;
}

export function updateItem(existingItem: Item, dofusDbItemDto: DofusDbItemDto) {
  updateLabel(existingItem.nameLabel, dofusDbItemDto.name);
  existingItem.level = dofusDbItemDto.level;
  existingItem.iconId = dofusDbItemDto.iconId;
}

export function mapItemDtoToEntity(dofusDbItemDto: DofusDbItemDto): Item {
  const itemNameLabel = new Label(dofusDbItemDto.name.fr, dofusDbItemDto.name.en);
  return new Item(dofusDbItemDto.id, dofusDbItemDto.level, itemNameLabel, dofusDbItemDto.iconId);
}

export function getItemDtoById(dofusDbItemDtos: DofusDbItemDto[], dofusId: number): DofusDbItemDto {
  return dofusDbItemDtos.find((item) => item.id === dofusId);
}
