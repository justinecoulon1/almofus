import { Inject, Injectable } from '@nestjs/common';
import { AlmanaxDay } from 'src/db/model/almanax-day.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AlmanaxDayRepository {
  private repository: Repository<AlmanaxDay>;

  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(AlmanaxDay);
  }

  async saveCharacterAlmanaxDays(days: AlmanaxDay[]): Promise<AlmanaxDay[]> {
    return await this.repository.save(days);
  }
}
