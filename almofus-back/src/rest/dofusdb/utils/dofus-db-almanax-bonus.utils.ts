import { AlmanaxBonus } from 'src/db/model/almanax-bonus.entity';
import { DofusDbAlmanaxBonusDto } from '../dto/dofus-db.dto';
import { createLabel, updateLabel } from './dofus-db-label.utils';

export function getAlmanaxBonus(
  almanaxBonusByNpcId: Record<number, AlmanaxBonus>,
  dofusDbAlmanaxBonusDto: DofusDbAlmanaxBonusDto,
): AlmanaxBonus {
  const existingAlmanaxBonus = almanaxBonusByNpcId[dofusDbAlmanaxBonusDto.npcId];
  if (!existingAlmanaxBonus) {
    return mapAlmanaxBonusDtoToEntity(dofusDbAlmanaxBonusDto);
  }
  updateAlmanaxBonus(existingAlmanaxBonus, dofusDbAlmanaxBonusDto);
  return existingAlmanaxBonus;
}

export function updateAlmanaxBonus(existingAlmanaxBonus: AlmanaxBonus, dofusDbAlmanaxBonusDto: DofusDbAlmanaxBonusDto) {
  updateLabel(existingAlmanaxBonus.nameLabel, dofusDbAlmanaxBonusDto.name);
  updateLabel(existingAlmanaxBonus.descLabel, dofusDbAlmanaxBonusDto.desc);
}

export function mapAlmanaxBonusDtoToEntity(dofusDbAlmanaxBonusDto: DofusDbAlmanaxBonusDto): AlmanaxBonus {
  const almanaxBonusNameLabel = createLabel(dofusDbAlmanaxBonusDto.name);
  const almanaxBonusDescLabel = createLabel(dofusDbAlmanaxBonusDto.desc);
  return new AlmanaxBonus(dofusDbAlmanaxBonusDto.npcId, almanaxBonusDescLabel, almanaxBonusNameLabel);
}

export function getAlmanaxBonusDtoById(
  dofusDbAlmanaxBonusDtos: DofusDbAlmanaxBonusDto[],
  dofusId: number,
): DofusDbAlmanaxBonusDto {
  return dofusDbAlmanaxBonusDtos.find((almanaxBonus) => almanaxBonus.npcId === dofusId);
}
