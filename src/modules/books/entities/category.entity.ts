import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity('categories')
export class Category {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Programming' })
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Book, (book) => book.categories)
  books: Book[];
}
