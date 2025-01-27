import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn({ name: 'label_id' })
  id: number = 0;

  @Column()
  fr: string;

  @Column()
  en: string;
}
