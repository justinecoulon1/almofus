import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('almanax_mobile_date')
export class AlmanaxMobileDate {
  @PrimaryGeneratedColumn({ name: 'almanax_mobile_date_id' })
  id: number;

  @Column()
  date: number;

  @Column()
  year: number;

  @Column({ name: 'quest_id' })
  questId: number;

  constructor(date: number, year: number, questId: number) {
    this.date = date;
    this.year = year;
    this.questId = questId;
  }
}
