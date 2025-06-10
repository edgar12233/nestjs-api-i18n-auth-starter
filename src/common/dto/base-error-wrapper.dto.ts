
import { ApiProperty } from '@nestjs/swagger';

export class FieldErrorDto {
  @ApiProperty({ example: 'email' })
  field: string;

  @ApiProperty({ example: 'email must be an email' })
  message: string;
}

export class BaseErrorDataDto {
  @ApiProperty({ example: 'VALIDATION_ERROR' })
  errorCode: string;

  @ApiProperty({ example: 'Usuário não encontrado ou senha incorreta', required: false })
  reason?: string;

  @ApiProperty({
    type: [FieldErrorDto],
    required: false,
  })
  fieldErrors?: FieldErrorDto[];
}

export class BaseErrorWrapperDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 'Erro ao processar requisição' })
  message: string;

  @ApiProperty({ type: BaseErrorDataDto, required: false })
  data?: BaseErrorDataDto;
}
