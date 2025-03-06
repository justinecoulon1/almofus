import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AlmanaxBonusDto } from './almanax-bonus.dto';
import { ItemDto } from './item.dto';
import { LabelDto } from './label.dto';
import { NpcDto } from './npc.dto';
import { Transform } from 'class-transformer';
import dayjs from 'dayjs';

export class GetAlmanaxQuestByDateQueryParamsDto {
  @IsString()
  date: number;

  @IsNumber()
  year: number;
}

export class GetAlmanaxQuestByDateRangeQueryParamsDto {
  @Transform((params) => dayjs(params.value).toDate())
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @Transform((params) => dayjs(params.value).toDate())
  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}

export type AlmanaxQuestDto = {
  id: number;
  date: number;
  year: number;
  itemQuantity: number;
  kamasReward: number;
  npc: NpcDto;
  item: ItemDto;
  almanaxBonus: AlmanaxBonusDto;
  nameLabel: LabelDto;
};
