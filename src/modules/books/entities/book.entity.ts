import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { UsersBook } from 'src/modules/users-books/entities/users-book.entity';
import { Category } from './category.entity';

@Entity('books')
export class Book {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Clean Code' })
  @Column()
  title: string;

  @ApiProperty({ example: 464 })
  @Column()
  pages: number;

  @ApiProperty({
    example: 'Um guia prático sobre boas práticas de programação.',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: 'http://example.com/image.jpg' })
  @Column({ name: 'image_url' })
  imageUrl: string;

  @ApiProperty({ example: 4.7 })
  @Column({ type: 'float', name: 'average_platform_grade', nullable: true })
  averagePlatformGrade: number;

  @ApiProperty({ example: 4.5 })
  @Column({ type: 'float', name: 'average_external_grade', nullable: true })
  averageExternalGrade: number;

  @ApiProperty({
    example: [
      { id: 1, name: 'Programming' },
      { id: 2, name: 'Software Development' },
    ],
    type: () => [Category],
  })
  @ManyToMany(() => Category, (category) => category.books, { cascade: true })
  @JoinTable({ name: 'books_categories' })
  categories: Category[];

  @OneToMany(() => UsersBook, (usersBook) => usersBook.book)
  usersBooks: UsersBook[];
}
