import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Book } from 'src/modules/books/entities/book.entity';

export enum UsersBookStatus {
  READING = 'reading',
  FINISHED = 'finished',
  TO_READ = 'to_read',
}

@Entity('users_books')
export class UsersBook {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'uuid' })
  @ManyToOne(() => User, (user) => user.usersBooks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ example: 'uuid' })
  @ManyToOne(() => Book, (book) => book.usersBooks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ApiProperty({ example: '2025-10-12T00:00:00Z' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ example: '2025-10-12T00:00:00Z' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ enum: ['reading', 'finished', 'to_read'] })
  @Column({ type: 'enum', enum: UsersBookStatus })
  status: UsersBookStatus;

  @ApiProperty({ example: '2025-10-12T00:00:00Z', required: false })
  @Column({ name: 'finished_at', type: 'timestamp', nullable: true })
  finishedAt?: Date;

  @ApiProperty({ example: 'Excelente leitura, recomendo!' })
  @Column({ type: 'text', nullable: true })
  review?: string;

  @ApiProperty({ example: 4.8 })
  @Column({ type: 'float', nullable: true })
  grade?: number;
}
