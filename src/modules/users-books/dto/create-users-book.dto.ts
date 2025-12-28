import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UsersBookStatus } from '../entities/users-book.entity';

export class CreateUsersBookDto {
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  user: string;

  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  book: string;

  @ApiProperty({ enum: UsersBookStatus, example: UsersBookStatus.READING })
  @IsEnum(UsersBookStatus)
  status: UsersBookStatus;

  @ApiProperty({ example: '2025-10-12T00:00:00Z', required: false })
  @IsOptional()
  finishedAt?: Date;

  @ApiProperty({ example: 'Ótima leitura, recomendo!', required: false })
  @IsOptional()
  @IsString()
  review?: string;

  @ApiProperty({ example: 4.5, required: false })
  @IsOptional()
  @IsNumber()
  grade?: number;
}
