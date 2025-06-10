import { IsEmail, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'usuario@email.com',
    description: 'Endereço de e-mail do usuário',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SenhaForte123!',
    description: 'Senha do usuário',
    required: true,
  })
  @IsString()
  @MaxLength(50)
  password: string;
}
