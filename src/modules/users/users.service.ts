import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClubsService } from '../clubs/clubs.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly clubsService: ClubsService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const { clubs: clubIds, ...userData } = dto;
    const user = this.usersRepository.create(userData);

    if (clubIds) {
      const clubs = await this.clubsService.findMany(clubIds);
      user.clubs = clubs;
    }

    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find({ relations: ['usersBooks'] });
  }

  async findAllPaginated(page = 1, limit = 10) {
    const [data, total] = await this.usersRepository.findAndCount({
      relations: ['usersBooks', 'clubs'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  findOne(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['usersBooks', 'clubs'],
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['clubs'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.clubs) {
      const clubs = await this.clubsService.findMany(dto.clubs);
      user.clubs = clubs;
    }

    Object.assign(user, dto);
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return { deleted: true };
  }
}
