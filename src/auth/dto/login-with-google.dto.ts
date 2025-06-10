import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginWithGoogleDto {
  @ApiProperty({
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0ZTQxM...',
    description: 'ID Token retornado pelo login do Google',
    required: true,
  })
  @IsString()
  idToken: string;
}
