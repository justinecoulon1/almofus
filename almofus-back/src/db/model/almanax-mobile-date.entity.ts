import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlmanaxQuest } from './almanax-quest.entity';

@Entity('almanax_mobile_date')
export class AlmanaxMobileDate {
  @PrimaryGeneratedColumn({ name: 'almanax_mobile_date_id' })
  id: number;

  @Column()
  date: number;

  @Column()
  year: number;

  @ManyToOne(() => AlmanaxQuest, { cascade: true })
  @JoinColumn({ name: 'quest_id' })
  questId: number;

  constructor(date: number, year: number, questId: number) {
    this.date = date;
    this.year = year;
    this.questId = questId;
  }
}
