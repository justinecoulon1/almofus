import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';
import { Label } from './label.entity';

@Entity('almanax_quest')
export class AlmanaxQuest {
  @PrimaryColumn({
    name: 'almanax_quest_id',
    generated: 'identity',
  })
  id: number;

  @Column()
  date: Date;

  @Column()
  itemQuantity: number;

  @Column()
  dofusNpcId: number;

  @Column()
  kamaReward: number;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  item: Promise<Item>;

  @ManyToOne(() => Label, { eager: true })
  @JoinColumn({ name: 'label_id' })
  nameLabel: Promise<Label>;

  @ManyToOne(() => Label, { eager: true })
  @JoinColumn({ name: 'label_id' })
  npcNameLabel: Promise<Label>;

  @ManyToOne(() => Label, { eager: true })
  @JoinColumn({ name: 'label_id' })
  bonusEffectDescriptionLabel: Promise<Label>;
}
