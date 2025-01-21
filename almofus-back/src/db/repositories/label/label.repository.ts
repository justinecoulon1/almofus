import { Inject, Injectable } from '@nestjs/common';
import { Label } from 'src/db/model/label.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LabelRepository {
  private repository: Repository<Label>;

  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(Label);
  }
}
