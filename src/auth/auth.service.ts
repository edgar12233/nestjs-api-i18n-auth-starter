import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { TranslationService } from '../common/services/translation.service';
import { TranslationGroup } from '../common/enums/translation-group.enum';
import { ApiErrorCodeEnum } from '../common/enums/api-error-code.enum'; // ajuste o caminho conforme o seu projeto

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const googleClientIdAndroid = this.configService.get<string>('GOOGLE_CLIENT_ID_ANDROID');
    const googleClientIdIos = this.configService.get<string>('GOOGLE_CLIENT_ID_IOS');

    if (!googleClientIdAndroid || !googleClientIdIos) {
      throw new InternalServerErrorException(
        TranslationService.getMessage(TranslationGroup.ERRORS, ApiErrorCodeEnum.MISSING_GOOGLE_CONFIG),
      );
    }

    this.googleClient = new OAuth2Client(googleClientIdAndroid);
  }

  async validateGoogle(idToken: string) {
    const audience = [
      this.configService.get<string>('GOOGLE_CLIENT_ID_ANDROID') ?? '',
      this.configService.get<string>('GOOGLE_CLIENT_ID_IOS') ?? '',
    ];

    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        throw new UnauthorizedException(
          TranslationService.getMessage(TranslationGroup.ERRORS, ApiErrorCodeEnum.INVALID_GOOGLE_TOKEN),
        );
      }

      let user = await this.usersService.findByEmail(payload.email);

      if (!user) {
        user = await this.usersService.create({
          email: payload.email,
          name: payload.name ?? '',
          googleId: payload.sub,
        });
      }

      const access_token = this.jwtService.sign({
        userId: user.id,
        email: user.email,
      });

      return {
        access_token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error('[AuthService] validateGoogle error:', error.message);
      } else {
        console.error('[AuthService] validateGoogle error:', error);
      }

      throw new UnauthorizedException(
        TranslationService.getMessage(TranslationGroup.ERRORS, ApiErrorCodeEnum.INVALID_GOOGLE_TOKEN),
      );
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user || !user.password) {
        throw new UnauthorizedException(
          TranslationService.getMessage(TranslationGroup.ERRORS, ApiErrorCodeEnum.INVALID_CREDENTIALS),
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException(
          TranslationService.getMessage(TranslationGroup.ERRORS, ApiErrorCodeEnum.INVALID_CREDENTIALS),
        );
      }

      const access_token = this.jwtService.sign({
        userId: user.id,
        email: user.email,
      });

      return {
        access_token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error('[AuthService] validateUser error:', error.message);
      } else {
        console.error('[AuthService] validateUser error:', error);
      }

      throw new UnauthorizedException(
        TranslationService.getMessage(TranslationGroup.ERRORS, ApiErrorCodeEnum.INVALID_CREDENTIALS),
      );
    }
  }
}
