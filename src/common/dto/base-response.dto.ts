import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty({
    example: true,
    description: 'Indica se a operação foi bem-sucedida',
  })
  success: boolean;

  @ApiProperty({
    example: 'Operação realizada com sucesso',
    description: 'Mensagem da operação',
  })
  message: string;

  @ApiProperty({ description: 'Dados retornados pela operação' })
  data: T;
}
