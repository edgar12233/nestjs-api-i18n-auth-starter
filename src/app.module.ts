import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { validationSchema } from './config/validation';
import { RequestContextService } from './common/services/request-context.service';
import { LanguageInterceptor } from './common/interceptors/language.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // true no dev, false no prod
      }),
    }),

    TypeOrmModule.forFeature([User]),
    AuthModule,
    UsersModule,
  ],
  providers: [RequestContextService, LanguageInterceptor],
})
export class AppModule {}
