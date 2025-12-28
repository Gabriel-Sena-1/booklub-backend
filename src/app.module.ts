import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { CheckoutsModule } from './modules/checkouts/checkouts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { Book } from './modules/books/entities/book.entity';
import { UsersBooksModule } from './modules/users-books/users-books.module';
import { UsersBook } from './modules/users-books/entities/users-book.entity';
import { Checkout } from './modules/checkouts/entities/checkout.entity';
import { RootConfiguration } from './environment/app-setup/config';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    UsersBooksModule,
    CheckoutsModule,
    TypeOrmModule.forRoot(RootConfiguration),
    TypeOrmModule.forFeature([User, Book, UsersBook, Checkout]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
