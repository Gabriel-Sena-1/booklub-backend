import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Gabriel Sena' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'gabriel@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg', required: false })
  @IsOptional()
  @IsString()
  photoUrl?: string;
}
