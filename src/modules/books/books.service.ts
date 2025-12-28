import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  create(dto: CreateBookDto) {
    const book = this.booksRepository.create(dto);
    return this.booksRepository.save(book);
  }

  findAll() {
    return this.booksRepository.find({ relations: ['usersBooks'] });
  }

  statsUsersReading() {
    return this.booksRepository
      .createQueryBuilder('book')
      .leftJoin('book.usersBooks', 'ub')
      .select('ub.status', 'status')
      .addSelect('COUNT(DISTINCT book.id)', 'totalBooks')
      .groupBy('ub.status')
      .getRawMany();
  }

  findOne(id: string) {
    return this.booksRepository.findOne({
      where: { id },
      relations: ['usersBooks'],
    });
  }

  async update(id: string, dto: UpdateBookDto) {
    await this.booksRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.booksRepository.delete(id);
    return { deleted: true };
  }
}
