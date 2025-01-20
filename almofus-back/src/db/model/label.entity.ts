import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlmanaxQuest } from "./almanax-quest.entity";
import { Item } from "./item.entity";

@Entity()
export class Label {
    @PrimaryGeneratedColumn({ name: 'label_id' })
    id: number;

    @Column()
    fr: string;

    @Column()
    en: string;

    @ManyToOne(() => AlmanaxQuest, (almanaxQuest) => almanaxQuest.nameLabelId)
    questNameLabelId: Promise<Label>;

    @ManyToOne(() => AlmanaxQuest, (almanaxQuest) => almanaxQuest.npcNameLabelId)
    npcNameLabelId: Promise<Label>;

    @ManyToOne(() => AlmanaxQuest, (almanaxQuest) => almanaxQuest.bonusEffectDescriptionLabelId)
    bonusEffectDescriptionLabelId: Promise<Label>;

    @ManyToOne(() => Item, (item) => item.nameLabelId)
    itemNameLabelId: Promise<Label>;
}