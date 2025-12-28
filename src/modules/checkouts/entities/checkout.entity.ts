import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UsersBook } from '../../users-books/entities/users-book.entity';

@Entity('checkouts')
export class Checkout {
  @ApiProperty({ description: 'Identificador único do checkout.' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Data de criação do registro.',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização do registro.' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Data de exclusão lógica do registro.',
    required: false,
  })
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @ApiProperty({ description: 'Data do checkout.' })
  @Column({ name: 'date', type: 'date' })
  date: Date;

  @ApiProperty({ description: 'URL da foto do checkout.', required: false })
  @Column({ name: 'photo', type: 'varchar', nullable: true })
  photo?: string;

  @ApiProperty({
    description: 'Página atual do livro no momento do checkout.',
    required: false,
  })
  @Column({ name: 'current_page', type: 'int', nullable: true })
  currentPage?: number;

  @ApiProperty({
    description: 'Comentário parcial do usuário sobre o livro.',
    required: false,
  })
  @Column({ name: 'partial_review', type: 'text', nullable: true })
  partialReview?: string;

  @ApiProperty({
    description: 'Indica se o comentário contém spoiler.',
    default: false,
  })
  @Column({ name: 'is_spoiler', type: 'boolean', default: false })
  isSpoiler: boolean;

  @ApiProperty({ description: 'ID da relação entre usuário e livro.' })
  @Column({ name: 'users_books_id', type: 'uuid' })
  usersBooksId: string;

  @ApiProperty({ description: 'Relação com o registro de UsersBook.' })
  @ManyToOne(() => UsersBook, { eager: true })
  @JoinColumn({ name: 'users_books_id' })
  usersBook: UsersBook;
}
