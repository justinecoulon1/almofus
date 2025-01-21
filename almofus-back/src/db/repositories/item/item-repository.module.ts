import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { ItemRepository } from './item-repository';

@Module({
  imports: [DatabaseModule],
  providers: [ItemRepository],
  exports: [ItemRepository],
})
export class ItemRepositoryModule { }
