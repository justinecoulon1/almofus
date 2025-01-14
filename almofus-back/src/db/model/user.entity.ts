import { IsEmail, Length } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './character.entity';

@Entity('almofus_user')
export class User {
  @PrimaryColumn({
    name: 'almofus_user_id',
    generated: 'identity',
  })
  id: number;

  @Column({ length: 50 })
  @Length(3, 50)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @OneToMany(type => Character, character => character.user)
  characters: Character[];
}
