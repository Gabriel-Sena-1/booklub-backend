import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout } from './entities/checkout.entity';
import { CheckoutsController } from './checkouts.controller';
import { CheckoutsService } from './checkouts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Checkout])],
  controllers: [CheckoutsController],
  providers: [CheckoutsService],
  exports: [TypeOrmModule],
})
export class CheckoutsModule {}
