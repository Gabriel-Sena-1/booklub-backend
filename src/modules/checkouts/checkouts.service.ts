import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkout } from './entities/checkout.entity';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { areTodayDate } from 'src/utils/equalsDate';

@Injectable()
export class CheckoutsService {
  constructor(
    @InjectRepository(Checkout)
    private readonly checkoutRepository: Repository<Checkout>,
  ) {}

  async validateCheckoutCreation(
    createCheckoutDto: CreateCheckoutDto,
  ): Promise<CheckoutsService> {
    // TODO: MAKE CHECKOUTS DEFAULT DATE AS CURRENT DATE
    // TODO: VALIDATE IF A CHECKOUT HAS ALREADY BEEN MADE TODAY FOR THE SAME USERS_BOOKS ID
    const isToday = (it: { date: string }) => areTodayDate(it.date);
    if (isToday(createCheckoutDto)) {
      throw new ConflictException(
        'A checkout for this book has already been created today.',
      );
    }

    return this;
  }

  async create(createCheckoutDto: CreateCheckoutDto): Promise<Checkout> {
    const checkout = (
      await this.validateCheckoutCreation(createCheckoutDto)
    ).checkoutRepository.create(createCheckoutDto);
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
