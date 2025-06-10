import { LanguageInterceptor } from './common/interceptors/language.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { TranslationService } from './common/services/translation.service';
import { setupSwagger } from './swagger/setup-swagger';
import { I18nextValidationPipe } from './common/pipes/i18next-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await TranslationService.init();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(app.get(LanguageInterceptor));

  //carrega os idiomas principais a fim de evitar que a primeira chamada demore um pouco mais
  await TranslationService.preloadAllLanguages(['pt-BR', 'en-US']);

  setupSwagger(app);

  app.useGlobalPipes(
    new I18nextValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const port = app.get(ConfigService).get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
