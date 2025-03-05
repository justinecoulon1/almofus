import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';
import { Label } from './label.entity';
import { AlmanaxBonus } from './almanax-bonus.entity';
import { Npc } from './npc.entity';

export enum MobileEvent {
  PAQUES = 'PAQUES',
  MARDIGRAS = 'MARDIGRAS',
  ASCENSION = 'ASCENSION',
  PENTECOTE = 'PENTECOTE',
  THANKSGIVING_CA = 'THANKSGIVING_CA',
  THANKSGIVING = 'THANKSGIVING',
}

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
  date: number | null;

  @Column({ name: 'item_quantity' })
  itemQuantity: number;

  @Column({ name: 'kamas_reward' })
  kamasReward: number;

  @Column({ name: 'mobile_event_name' })
  mobileEvent: MobileEvent | null;

  @ManyToOne(() => Npc, { eager: true, cascade: true })
  @JoinColumn({ name: 'npc_id' })
  npc: Npc;

  @ManyToOne(() => Item, { eager: true, cascade: true })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToOne(() => AlmanaxBonus, { eager: true, cascade: true })
  @JoinColumn({ name: 'almanax_bonus_id' })
  almanaxBonus: AlmanaxBonus;

  @ManyToOne(() => Label, { eager: true, cascade: true })
  @JoinColumn({ name: 'name_label_id' })
  nameLabel: Label;

  constructor(
    dofusId: number,
    date: number | null,
    itemQuantity: number,
    kamasReward: number,
    npc: Npc,
    item: Item,
    almanaxBonus: AlmanaxBonus,
    nameLabel: Label,
    mobileEvent: MobileEvent | null,
  ) {
    this.dofusId = dofusId;
    this.date = date;
    this.itemQuantity = itemQuantity;
    this.kamasReward = kamasReward;
    this.npc = npc;
    this.item = item;
    this.almanaxBonus = almanaxBonus;
    this.nameLabel = nameLabel;
    this.mobileEvent = mobileEvent;
  }
}
