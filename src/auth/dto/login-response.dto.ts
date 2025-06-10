import { ApiProperty } from '@nestjs/swagger';

class UserResponseDto {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  id: number;

  @ApiProperty({
    example: 'usuario@email.com',
    description: 'E-mail do usuário',
  })
  email: string;

  @ApiProperty({
    example: 'Nome do Usuário',
    description: 'Nome completo do usuário',
  })
  name: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT token de autenticação',
  })
  access_token: string;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}

export class LoginResponseWrapperDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Login realizado com sucesso' })
  message: string;

  @ApiProperty({ type: LoginResponseDto })
  data: LoginResponseDto;
}
