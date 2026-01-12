import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkout } from './entities/checkout.entity';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { areTodayDate } from 'src/utils/equalsDate';
import { UsersBook } from '../users-books/entities/users-book.entity';
import { UsersBooksService } from '../users-books/users-books.service';

@Injectable()
export class CheckoutsService {
  constructor(
    private readonly usersBooksService: UsersBooksService, 
    @InjectRepository(Checkout)
    private readonly checkoutRepository: Repository<Checkout>,
  ) {}

  async validateReadPages(
    createCheckoutDto: CreateCheckoutDto,
  ): Promise<void> {
    const usersBook = await this.usersBooksService.findOne(createCheckoutDto.usersBooksId);
    
    if (usersBook && usersBook.book.pages < createCheckoutDto.currentPage!) {
      throw new BadRequestException('A página atual não pode ser maior que o número total de páginas do livro.');
    };
  };

  async create(createCheckoutDto: CreateCheckoutDto): Promise<Checkout> {
    await this.validateReadPages(createCheckoutDto);
    const today = new Date();
    const checkout = this.checkoutRepository.create({
      ...createCheckoutDto, 
      createdAt: today,
    });
    return this.checkoutRepository.save(checkout);
  }

  async findAll(): Promise<Checkout[]> {
    return this.checkoutRepository.find();
  }

  async findOne(id: string): Promise<Checkout | null> {
    return this.checkoutRepository.findOne({ where: { id } });
  }

  async findAllByUsersBooksId(
    usersBooksId: string,
  ): Promise<Checkout[] | null> {
    return this.checkoutRepository.find({ where: { usersBooksId } });
  }

  async update(
    id: string,
    updateCheckoutDto: UpdateCheckoutDto,
  ): Promise<Checkout | null> {
    await this.checkoutRepository.update(id, updateCheckoutDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.checkoutRepository.softDelete(id);
  }
}
