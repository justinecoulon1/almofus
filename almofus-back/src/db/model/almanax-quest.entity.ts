import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';
import { Label } from './label.entity';
import { AlmanaxBonus } from './almanax-bonus.entity';
import { Npc } from './npc.entity';

@Entity('almanax_quest')
export class AlmanaxQuest {
  @PrimaryColumn({
    name: 'almanax_quest_id',
    generated: 'identity',
  })
  id: number;

  @Column({ name: 'dofus_quest_id' })
  dofusId: number;

  @Column()
  date: Date;

  @Column({ name: 'item_quantity' })
  itemQuantity: number;

  @Column({ name: 'kamas_reward' })
  kamasReward: number;

  @ManyToOne(() => Npc, { cascade: true })
  @JoinColumn({ name: 'npc_id' })
  npc: Promise<Npc>;

  @ManyToOne(() => Item, { cascade: true })
  @JoinColumn({ name: 'item_id' })
  item: Promise<Item>;

  @ManyToOne(() => AlmanaxBonus, { cascade: true })
  @JoinColumn({ name: 'almanax_bonus_id' })
  almanaxBonus: Promise<AlmanaxBonus>;

  @ManyToOne(() => Label, { eager: true, cascade: true })
  @JoinColumn({ name: 'name_label_id' })
  nameLabel: Label;

  constructor(
    dofusId: number,
    date: Date,
    itemQuantity: number,
    kamasReward: number,
    npc: Npc,
    item: Item,
    almanaxBonus: AlmanaxBonus,
    nameLabel: Label,
  ) {
    this.dofusId = dofusId;
    this.date = date;
    this.itemQuantity = itemQuantity;
    this.kamasReward = kamasReward;
    this.npc = Promise.resolve(npc);
    this.item = Promise.resolve(item);
    this.almanaxBonus = Promise.resolve(almanaxBonus);
    this.nameLabel = nameLabel;
  }
}
