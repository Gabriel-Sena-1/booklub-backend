import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';
import { UsersBook } from 'src/modules/users-books/entities/users-book.entity';
import { Club } from 'src/modules/clubs/entities/club.entity';
import { JoinTable } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'uuid',
    description: 'Identificador único do usuário',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '2025-10-12T00:00:00Z' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ example: '2025-10-12T00:00:00Z', required: false })
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @ApiProperty({ example: '2025-10-12T00:00:00Z', required: false })
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @ApiProperty({ example: 'https://example.com/photo.jpg', required: false })
  @Column({ name: 'photo_url', nullable: true })
  photoUrl?: string;

  @ApiProperty({ example: 'Gabriel Sena' })
  @Column()
  name: string;

  @ApiProperty({ example: 'gabriel@email.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'hashed_password' })
  @Column()
  password: string;

  @OneToMany(() => UsersBook, (usersBook) => usersBook.user)
  usersBooks: UsersBook[];

  @ManyToMany(() => Club, (club) => club.users)
  @JoinTable()
  clubs: Club[];
}
