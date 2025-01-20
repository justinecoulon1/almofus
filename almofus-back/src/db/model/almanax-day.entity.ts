import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Character } from './character.entity';
import { AlmanaxQuest } from './almanax-quest.entity';

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
  character: Promise<Character>;

  @ManyToOne(() => AlmanaxQuest)
  @JoinColumn({ name: 'almanax_quest_id' })
  almanaxQuest: Promise<AlmanaxQuest>;
}
