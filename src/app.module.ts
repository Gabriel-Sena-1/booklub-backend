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
import { ClubsModule } from './modules/clubs/clubs.module';
import { Club } from './modules/clubs/entities/club.entity';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from './modules/cache/cache.module';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    UsersBooksModule,
    CheckoutsModule,
    ClubsModule,
    TypeOrmModule.forRoot(RootConfiguration),
    TypeOrmModule.forFeature([User, Book, UsersBook, Checkout, Club]),
    AuthModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
