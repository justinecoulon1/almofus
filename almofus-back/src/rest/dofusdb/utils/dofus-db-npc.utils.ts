import { DofusDbNpcDto } from '../dto/dofus-db.dto';
import { Label } from 'src/db/model/label.entity';
import { Npc } from 'src/db/model/npc.entity';
import { updateLabel } from './dofus-db-label.utils';

export function getNpc(
  npcById: Record<number, Npc>,
  dofusDbNpcDto: DofusDbNpcDto,
): Npc {
  const existingNpc = npcById[dofusDbNpcDto.id];
  if (!existingNpc) {
    return mapNpcDtoToEntity(dofusDbNpcDto);
  }
  updateNpc(existingNpc, dofusDbNpcDto);
  return existingNpc;
}

export function updateNpc(existingNpc: Npc, dofusDbNpcDto: DofusDbNpcDto) {
  updateLabel(existingNpc.nameLabel, dofusDbNpcDto.name);
}

export function mapNpcDtoToEntity(dofusDbNpcDto: DofusDbNpcDto): Npc {
  const npcNameLabel = new Label(dofusDbNpcDto.name.fr, dofusDbNpcDto.name.en);
  return new Npc(dofusDbNpcDto.id, npcNameLabel);
}

export function getNpcDtoById(
  dofusDbNpcDtos: DofusDbNpcDto[],
  dofusId: number,
): DofusDbNpcDto {
  return dofusDbNpcDtos.find((npc) => npc.id === dofusId);
}
