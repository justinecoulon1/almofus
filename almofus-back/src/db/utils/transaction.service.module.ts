import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { TransactionService } from './transaction.service';

@Module({
  imports: [DatabaseModule],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionServiceModule {}
