import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { LabelRepository } from './label-repository';

@Module({
  imports: [DatabaseModule],
  providers: [LabelRepository],
  exports: [LabelRepository],
})
export class LabelRepositoryModule { }
