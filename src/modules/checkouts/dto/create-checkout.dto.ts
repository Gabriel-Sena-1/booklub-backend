import {
  IsDateString,
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCheckoutDto {
  @ApiPropertyOptional({
    description: 'Página atual do livro no momento do checkout.',
  })
  @IsOptional()
  @IsInt()
  currentPage?: number;

  @ApiPropertyOptional({
    description: 'Comentário parcial do usuário sobre o livro.',
  })
  @IsOptional()
  @IsString()
  partialReview?: string;

  @ApiProperty({ description: 'Indica se o comentário contém spoiler.' })
  isSpoiler: boolean;

  @ApiProperty({ description: 'ID da relação entre usuário e livro.' })
  @IsUUID()
  usersBooksId: string;
}


export const CheckoutBaseSchema = {
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
        description: 'Arquivo de foto do checkout',
      },
      date: {
        type: 'string',
        format: 'date',
        description: 'Data do checkout',
      },
      currentPage: { type: 'integer', description: 'Página atual' },
      partialReview: { type: 'string', description: 'Comentário parcial' },
      isSpoiler: { type: 'boolean' },
      usersBooksId: {
        type: 'string',
        format: 'uuid',
        description: 'ID da relação entre usuário e livro',
      },
    },
    required: ['usersBooksId'],
  }
};
