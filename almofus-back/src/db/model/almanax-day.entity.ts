import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Character } from './character.entity';
import { AlmanaxQuest as AlmanaxQuest } from './almanax-quest.entity';

@Entity('almanax_day')
export class AlmanaxDay {
  @PrimaryColumn({
    name: 'almanax_day_id',
    generated: 'identity',
  })
  id: number;

  @Column({ name: 'is_validated' })
  isValidated: boolean;

  @ManyToOne(() => Character, (character) => character.almanaxDays)
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @OneToMany(() => AlmanaxQuest, (almanaxQuest) => almanaxQuest.almanaxDay)
  @JoinColumn({ name: 'almanax_quest_id' })
  almanaxQuest: AlmanaxQuest;
}
