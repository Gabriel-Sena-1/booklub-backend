import { Module } from '@nestjs/common';
import { UsersBooksService } from './users-books.service';
import { UsersBooksController } from './users-books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersBook } from './entities/users-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersBook])],
  controllers: [UsersBooksController],
  providers: [UsersBooksService],
})
export class UsersBooksModule {}
