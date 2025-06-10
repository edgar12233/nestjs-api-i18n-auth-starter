import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginWithGoogleDto } from './dto/login-with-google.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseWrapperDto } from './dto/login-response.dto';
import { BaseResponse } from '../common/helpers/base-response';
import { BaseErrorWrapperDto } from '../common/dto/base-error-wrapper.dto';
import { TranslationGroup } from '../common/enums/translation-group.enum';
import { ApiSuccessCodeEnum } from '../common/enums/api-success-code.enum';
import { ApiAcceptLanguageHeader } from '../swagger/swagger-headers';

@ApiTags('Auth')
@ApiAcceptLanguageHeader()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google')
  @ApiOperation({ summary: 'Login com Google' })
  @ApiBody({ type: LoginWithGoogleDto })
  @ApiResponse({
    status: 200,
    description: 'Login com sucesso',
    type: LoginResponseWrapperDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
    type: BaseErrorWrapperDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: BaseErrorWrapperDto,
  })
  @ApiResponse({ status: 401, description: 'Token inválido ou não autorizado' })
  async loginWithGoogle(@Body() body: LoginWithGoogleDto) {
    const result = await this.authService.validateGoogle(body.idToken);
    return BaseResponse.ok(result, TranslationGroup.SUCCESS, ApiSuccessCodeEnum.LOGIN_SUCCESS);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login com e-mail e senha' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login com sucesso',
    type: LoginResponseWrapperDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
    type: BaseErrorWrapperDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: BaseErrorWrapperDto,
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() body: LoginDto) {
    const result = await this.authService.validateUser(body.email, body.password);
    return BaseResponse.ok(result, TranslationGroup.SUCCESS, ApiSuccessCodeEnum.LOGIN_SUCCESS);
  }
}
