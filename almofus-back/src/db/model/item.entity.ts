import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Label } from './label.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn({ name: 'item_id' })
  id: number;

  @Column({ name: 'dofus_item_id' })
  dofusId: number;

  @Column()
  level: number;

  @Column({ name: 'icon_id' })
  iconId: number;

  @ManyToOne(() => Label, { eager: true, cascade: true })
  @JoinColumn({ name: 'name_label_id' })
  nameLabel: Label;

  constructor(dofusId: number, level: number, nameLabel: Label, iconId: number) {
    this.dofusId = dofusId;
    this.level = level;
    this.nameLabel = nameLabel;
    this.iconId = iconId;
  }
}
