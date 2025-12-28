import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UsersBook } from 'src/modules/users-books/entities/users-book.entity';

@Entity('books')
export class Book {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Clean Code' })
  @Column()
  name: string;

  @ApiProperty({ example: 464 })
  @Column()
  pages: number;

  @ApiProperty({
    example: 'Um guia prático sobre boas práticas de programação.',
  })
  @Column({ type: 'text' })
  summary: string;

  @ApiProperty({ example: 4.7 })
  @Column({ type: 'float', name: 'average_platform_grade', nullable: true })
  averagePlatformGrade: number;

  @ApiProperty({ example: 4.5 })
  @Column({ type: 'float', name: 'average_external_grade', nullable: true })
  averageExternalGrade: number;

  @OneToMany(() => UsersBook, (usersBook) => usersBook.book)
  usersBooks: UsersBook[];
}
