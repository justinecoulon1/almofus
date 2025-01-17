import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Character } from "./character.entity";
import { AlmanaxQuest as AlmanaxQuest } from "./almanax-quest.entity";

@Entity()
export class AlmanaxDay {
    @PrimaryColumn({
        name: 'almanax_day_id',
        generated: 'identity',
    })
    id: number;

    @Column()
    isValidated: boolean;

    @ManyToOne(type => Character, character => character.almanaxDays)
    @JoinColumn({ name: 'character_id' })
    character: Character;

    @OneToMany(type => AlmanaxQuest, almanaxQuest => almanaxQuest.almanaxDay)
    @JoinColumn({ name: 'almanax_quest_id' })
    almanaxQuest: AlmanaxQuest;

}