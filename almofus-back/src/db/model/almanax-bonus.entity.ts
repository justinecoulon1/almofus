import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Label } from './label.entity';

@Entity('almanax_bonus')
export class AlmanaxBonus {
  @PrimaryGeneratedColumn({ name: 'bonus_id' })
  id: number;

  @ManyToOne(() => Label, { eager: true, cascade: true })
  @JoinColumn({ name: 'desc_label_id' })
  descLabel: Label;

  @ManyToOne(() => Label, { eager: true, cascade: true })
  @JoinColumn({ name: 'name_label_id' })
  nameLabel: Label;

  constructor(descLabel: Label, nameLabel: Label) {
    this.descLabel = descLabel;
    this.nameLabel = nameLabel;
  }
}
