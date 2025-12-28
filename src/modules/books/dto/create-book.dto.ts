import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Clean Code' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 464 })
  @IsNumber()
  pages: number;

  @ApiProperty({ example: 'Um guia sobre boas práticas de programação.' })
  @IsString()
  description: string;
}
