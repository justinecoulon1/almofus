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

  @Column({ name: 'dofus_item_id' })
  level: number;

  @ManyToOne(() => Label, { eager: true })
  @JoinColumn({ name: 'label_id' })
  nameLabel: Promise<Label>;

  constructor(dofusId: number, level: number, nameLabel: Label) {
    this.dofusId = dofusId;
    this.level = level;
    this.nameLabel = Promise.resolve(nameLabel);
  }
}
