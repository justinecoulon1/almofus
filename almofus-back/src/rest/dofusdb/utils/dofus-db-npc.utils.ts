import { Npc } from 'src/db/model/npc.entity';
import { DofusDbNpcDto } from '../dto/dofus-db.dto';
import { createLabel, updateLabel } from './dofus-db-label.utils';

export function getNpc(npcById: Record<number, Npc>, dofusDbNpcDto: DofusDbNpcDto): Npc {
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
  const npcNameLabel = createLabel(dofusDbNpcDto.name);
  return new Npc(dofusDbNpcDto.id, npcNameLabel);
}

export function getNpcDtoById(dofusDbNpcDtos: DofusDbNpcDto[], dofusId: number): DofusDbNpcDto {
  return dofusDbNpcDtos.find((npc) => npc.id === dofusId);
}
