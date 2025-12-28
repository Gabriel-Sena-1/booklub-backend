import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersBook } from './entities/users-book.entity';
import { CreateUsersBookDto } from './dto/create-users-book.dto';
import { UpdateUsersBookDto } from './dto/update-users-book.dto';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';


@Injectable()
export class UsersBooksService {
  constructor(
    @InjectRepository(UsersBook)
    private readonly usersBooksRepository: Repository<UsersBook>,
  ) {}

  create(dto: CreateUsersBookDto) {
    const relation = this.usersBooksRepository.create({
      ...dto,
      user: { id: dto.user } as User,
      book: { id: dto.book } as Book,
    });

    return this.usersBooksRepository.save(relation);
  }

  findAll() {
    return this.usersBooksRepository.find({ relations: ['user', 'book'] });
  }

  findOne(id: string) {
    return this.usersBooksRepository.findOne({
      where: { id },
      relations: ['user', 'book'],
    });
  }

  async update(id: string, dto: UpdateUsersBookDto) {
    const updated = this.usersBooksRepository.create({
      ...dto,
      user: dto.user ? ({ id: dto.user } as User) : undefined,
      book: dto.book ? ({ id: dto.book } as Book) : undefined,
    });

    await this.usersBooksRepository.update(id, updated);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.usersBooksRepository.delete(id);
    return { deleted: true };
  }
}
