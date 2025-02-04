import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Label } from './label.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn({ name: 'item_id' })
  id: number;

  @Column({ name: 'dofus_item_id' })
  dofusId: number;

  @Column()
  level: number;

  @ManyToOne(() => Label, { eager: true, cascade: true })
  @JoinColumn({ name: 'name_label_id' })
  nameLabel: Label;

  constructor(dofusId: number, level: number, nameLabel: Label) {
    this.dofusId = dofusId;
    this.level = level;
    this.nameLabel = nameLabel;
  }
}
