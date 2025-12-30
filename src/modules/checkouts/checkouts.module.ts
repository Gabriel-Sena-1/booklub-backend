import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout } from './entities/checkout.entity';
import { CheckoutsController } from './checkouts.controller';
import { CheckoutsService } from './checkouts.service';
import { UsersBooksModule } from '../users-books/users-books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Checkout]),
    UsersBooksModule,
  ],
  controllers: [CheckoutsController],
  providers: [CheckoutsService],
  exports: [TypeOrmModule],
})
export class CheckoutsModule {}
