import { IsNumber, IsString } from 'class-validator';
import { AlmanaxBonusDto } from './almanax-bonus.dto';
import { ItemDto } from './item.dto';
import { LabelDto } from './label.dto';
import { NpcDto } from './npc.dto';

export class GetAlmanaxQuestByDateQueryParamsDto {
  @IsString()
  date: string;

  @IsNumber()
  year: number;
}

export type AlmanaxQuestDto = {
  id: number;
  date: string;
  year: number;
  itemQuantity: number;
  kamasReward: number;
  npc: NpcDto;
  item: ItemDto;
  almanaxBonus: AlmanaxBonusDto;
  nameLabel: LabelDto;
};
