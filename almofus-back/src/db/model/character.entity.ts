import { Length } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { AlmanaxDay } from "./almanax-day.entity";

@Entity()
export class Character {
    @PrimaryColumn({
        name: 'character_id',
        generated: 'identity',
    })
    id: number;

    @Column({ length: 50 })
    @Length(3, 50)
    name: string;

    @ManyToOne(type => User, user => user.characters)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(type => AlmanaxDay, almanaxDay => almanaxDay.character)
    almanaxDays: AlmanaxDay[];
}