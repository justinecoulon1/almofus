import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlmanaxQuest } from "./almanax-quest.entity";
import { Label } from "./label.entity";


@Entity()
export class Item {
    @PrimaryGeneratedColumn({ name: 'item_id' })
    id: number;

    @Column({ name: 'dofus_item_id' })
    dofusId: number

    @Column({ name: 'dofus_item_id' })
    level: number

    @ManyToOne(() => AlmanaxQuest, (almanaxQuest) => almanaxQuest.item)
    almanaxQuest: Promise<AlmanaxQuest>;

    @OneToMany(() => Label, (label) => label.itemNameLabelId)
    @JoinColumn({ name: 'label_id' })
    nameLabelId: Label;
}
