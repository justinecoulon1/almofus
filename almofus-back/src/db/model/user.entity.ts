import { IsEmail, Length } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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
}
