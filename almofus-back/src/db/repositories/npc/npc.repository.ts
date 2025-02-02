import { Inject, Injectable } from '@nestjs/common';
import { Npc } from 'src/db/model/npc.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class NpcRepository {
  private repository: Repository<Npc>;

  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(Npc);
  }

  findAll(): Promise<Npc[]> {
    return this.repository.find();
  }
}
