import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateClubDto {
  @IsString()
  @ApiProperty({ example: 'Book Lovers Club', description: 'The name of the club' })
  name: string;
}
