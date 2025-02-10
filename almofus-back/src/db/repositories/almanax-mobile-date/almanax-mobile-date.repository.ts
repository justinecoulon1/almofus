import { Inject, Injectable } from '@nestjs/common';
import { AlmanaxMobileDate } from 'src/db/model/almanax-mobile-date.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AlmanaxMobileDateRepository {
  private repository: Repository<AlmanaxMobileDate>;

  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(AlmanaxMobileDate);
  }

  findAll(): Promise<AlmanaxMobileDate[]> {
    return this.repository.find();
  }

  findByYear(year: number): Promise<AlmanaxMobileDate[]> {
    return this.repository.findBy({ year });
  }

  createAlmanaxMobileDate(almanaxMobileDate: AlmanaxMobileDate): Promise<AlmanaxMobileDate> {
    return this.repository.save(almanaxMobileDate);
  }

  createAlmanaxMobileDates(almanaxMobileDate: AlmanaxMobileDate[]): Promise<AlmanaxMobileDate[]> {
    return this.repository.save(almanaxMobileDate);
  }
}
