import { IsEmail, Length } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './character.entity';

@Entity('almofus_user')
export class User {
  @PrimaryGeneratedColumn({ name: 'almofus_user_id' })
  id: number;

  @Column({ length: 50 })
  @Length(3, 50)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Character, (character) => character.user)
  characters: Promise<Character[]>;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
