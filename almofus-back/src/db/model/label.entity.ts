import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn({ name: 'label_id' })
  id: number;

  @Column()
  fr: string;

  @Column()
  en: string;

  constructor(fr: string, en: string) {
    this.fr = fr;
    this.en = en;
  }
}
