import { Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlmanaxDay } from './almanax-day.entity';
import { User } from './user.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn({ name: 'character_id' })
  id: number;

  @Column({ length: 50 })
  @Length(3, 50)
  name: string;

  @ManyToOne(() => User, (user) => user.characters)
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @OneToMany(() => AlmanaxDay, (almanaxDay) => almanaxDay.character)
  almanaxDays: Promise<AlmanaxDay[]>;

  constructor(name: string, user: User) {
    this.name = name;
    this.user = Promise.resolve(user);
  }
}
