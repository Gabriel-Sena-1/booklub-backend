import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IsEmail } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ example: 'gabriel@email.com' })
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    readonly username: string;
    
    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
