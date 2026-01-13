import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty({ example: ['clubId1', 'clubId2'], required: false })
  @IsArray()
  @IsOptional()
  clubs?: string[];
}
