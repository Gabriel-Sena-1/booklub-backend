import { UsersBookStatus } from 'src/modules/users-books/entities/users-book.entity';

export const NOT_READING_STATUSES = Object.keys(UsersBookStatus).filter(
  (status) => status !== UsersBookStatus.READING,
);