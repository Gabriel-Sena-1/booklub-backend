import { PartialType } from '@nestjs/swagger';
import { CreateUsersBookDto } from './create-users-book.dto';

export class UpdateUsersBookDto extends PartialType(CreateUsersBookDto) {}
