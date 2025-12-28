import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find({ relations: ['usersBooks'] });
  }

  findOne(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['usersBooks'],
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.usersRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return { deleted: true };
  }
}
