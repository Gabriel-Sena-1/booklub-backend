import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
    @ApiProperty({ example: 'gabriel@email.com' })
    readonly username: string;
    @ApiProperty({ example: '123456' })
    readonly password: string;
}
