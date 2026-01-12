import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('clubs')
export class Club {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.clubs)
  users: User[];
}
