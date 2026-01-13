import { User } from 'src/modules/users/entities/user.entity';
import { ENV } from '../variables/env';
import { Book } from 'src/modules/books/entities/book.entity';
import { UsersBook } from 'src/modules/users-books/entities/users-book.entity';
import { Checkout } from 'src/modules/checkouts/entities/checkout.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Club } from 'src/modules/clubs/entities/club.entity';

export const RootConfiguration: TypeOrmModuleOptions = {
  ...ENV.DatabaseVariables,
  entities: [User, Book, UsersBook, Checkout, Club],
  autoLoadEntities: true,
  synchronize: true,
};
