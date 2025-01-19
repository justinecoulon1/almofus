import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { AlmanaxDay } from './almanax-day.entity';

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

  @ManyToOne(() => AlmanaxDay, (almanaxDay) => almanaxDay.almanaxQuest)
  almanaxDay: AlmanaxDay;

  // sur item : itemId
  // sur label : nameLabelId, npcNameLabelId, bonusEffectDescriptionLabelId
}
