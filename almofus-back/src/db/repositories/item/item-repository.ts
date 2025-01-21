import { Inject, Injectable } from '@nestjs/common';
import { Item } from 'src/db/model/item.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ItemRepository {
  private repository: Repository<Item>;

  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(Item);
  }
}
