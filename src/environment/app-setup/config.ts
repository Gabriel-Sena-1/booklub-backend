import { User } from 'src/modules/users/entities/user.entity';
import { ENV } from '../variables/env';
import { Book } from 'src/modules/books/entities/book.entity';
import { UsersBook } from 'src/modules/users-books/entities/users-book.entity';
import { Checkout } from 'src/modules/checkouts/entities/checkout.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const RootConfiguration: TypeOrmModuleOptions = {
  ...ENV.DatabaseVariables,
  entities: [User, Book, UsersBook, Checkout],
  autoLoadEntities: true,
  synchronize: true,
};
