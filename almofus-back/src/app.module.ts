import { Module } from '@nestjs/common';
import { UsersModule } from './rest/user/user.module';
import { DofusDbDataModule } from './rest/dofusdb/dofus-db-data.module';

@Module({
  imports: [UsersModule, DofusDbDataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
