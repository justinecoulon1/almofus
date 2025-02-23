import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Label } from './label.entity';

@Entity()
export class Npc {
  @PrimaryGeneratedColumn({ name: 'npc_id' })
  id: number;

  @Column({ name: 'dofus_npc_id' })
  dofusId: number;

  @ManyToOne(() => Label, { eager: true, cascade: true })
  @JoinColumn({ name: 'name_label_id' })
  nameLabel: Label;

  constructor(dofusId: number, nameLabel: Label) {
    this.dofusId = dofusId;
    this.nameLabel = nameLabel;
  }
}
