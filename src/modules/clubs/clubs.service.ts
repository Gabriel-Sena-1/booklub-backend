import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly clubsRepository: Repository<Club>,
  ) {}

  create(dto: CreateClubDto) {
    const club = this.clubsRepository.create(dto);
    return this.clubsRepository.save(club);
  }

  async findAllPaginated(page = 1, limit = 10) {
    const [data, total] = await this.clubsRepository.findAndCount({
      relations: ['users'],
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
    return this.clubsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async findMany(ids: string[]) {
    return this.clubsRepository
      .createQueryBuilder('club')
      .leftJoinAndSelect('club.users', 'user')
      .where('club.id IN (:...ids)', { ids })
      .getMany();
  }

  async update(id: string, dto: UpdateClubDto) {
    await this.clubsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.clubsRepository.delete(id);
    return { deleted: true };
  }
}
