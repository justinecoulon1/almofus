import axios from 'axios';
import {
  DofusDbAlmanaxBonusDto,
  DofusDbItemDto,
  DofusDbNpcDto,
  DofusDbQuestDto,
  SyncRequestDto,
} from '../dto/dofus-db.dto';

export type DofusDbEntry = {
  _id: string;
  id: string;
};

export type DofusDbResponse = {
  total: number;
  limit: number;
  skip: number;
  data: DofusDbEntry[];
};

const AxiosDofusdb = axios.create({
  baseURL: 'https://api.dofusdb.fr/',
});

async function getDofusDbEntries(
  collectionName: string,
  filter: any,
): Promise<DofusDbEntry[]> {
  const allEntries: DofusDbEntry[] = [];
  let skip = 0;
  let totalLength = -1;
  while (allEntries.length !== totalLength) {
    const { data: responseData } = await AxiosDofusdb.get<DofusDbResponse>(
      collectionName,
      {
        params: {
          $limit: 50,
          $skip: skip,
          ...filter,
        },
      },
    );
    const entries = responseData.data;
    if (entries.length === 0) {
      throw new Error('Empty response - should not happen');
    }
    totalLength = responseData.total;
    skip += entries.length;
    allEntries.push(...entries);
  }
  return allEntries;
}

export async function getSyncDofusDbData(): Promise<SyncRequestDto> {
  const npcs = (await getDofusDbEntries('npcs', {
    $select: ['id', 'name'],
  })) as unknown as DofusDbNpcDto[];
  console.log('npcs done', npcs.length);

  const items = (await getDofusDbEntries('items', {
    $select: ['id', 'name', 'level'],
  })) as unknown as DofusDbItemDto[];
  console.log('items done', items.length);

  const almanaxBonuses = (await getDofusDbEntries('almanax-calendars', {
    $select: ['npcId', 'name', 'desc'],
  })) as unknown as DofusDbAlmanaxBonusDto[];
  console.log('almanaxBonuses done', almanaxBonuses.length);

  const almanaxQuests = (await getDofusDbEntries('quests', {
    categoryId: 31,
  })) as unknown as DofusDbQuestDto[];
  console.log('almanaxQuests done', almanaxQuests.length);

  return {
    dofusDbNpcDtos: npcs,
    dofusDbItemDtos: items,
    dofusDbAlmanaxBonusDtos: almanaxBonuses,
    dofusDbQuestDto: almanaxQuests,
  };
}
