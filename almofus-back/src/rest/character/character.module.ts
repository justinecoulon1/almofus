import { Module } from '@nestjs/common';
import { CharacterRepositoryModule } from 'src/db/repositories/character/character.repository.module';
import { UserModule } from '../user/user.module';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { TransactionServiceModule } from '../../db/utils/transaction.service.module';
import { AlmanaxDaysModule } from '../almanax-days/almanax-days.module';

@Module({
  imports: [UserModule, CharacterRepositoryModule, TransactionServiceModule, AlmanaxDaysModule],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
