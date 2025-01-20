import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { AlmanaxDay } from './almanax-day.entity';
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

    @ManyToOne(() => AlmanaxDay, (almanaxDay) => almanaxDay.almanaxQuest)
    almanaxDay: Promise<AlmanaxDay>;

    @OneToMany(() => Item, (item) => item.almanaxQuest)
    @JoinColumn({ name: 'item_id' })
    item: Item;

    @OneToMany(() => Label, (label) => label.questNameLabelId)
    @JoinColumn({ name: 'label_id' })
    nameLabelId: Label;

    @OneToMany(() => Label, (label) => label.npcNameLabelId)
    @JoinColumn({ name: 'label_id' })
    npcNameLabelId: Label;

    @OneToMany(() => Label, (label) => label.bonusEffectDescriptionLabelId)
    @JoinColumn({ name: 'label_id' })
    bonusEffectDescriptionLabelId: Label;
}
