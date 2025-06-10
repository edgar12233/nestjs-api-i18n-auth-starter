import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from '../helpers/base-response';
import { TranslationGroup } from '../enums/translation-group.enum';
import { ApiErrorCodeEnum } from '../enums/api-error-code.enum';
import { extractPrimaryLanguage } from '../helpers/language-utils';
import { I18nValidationException } from '../exceptions/i18n-validation.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest();

    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const langHeader = req.headers['accept-language'] || 'pt-BR';
    const lang = extractPrimaryLanguage(langHeader, 'pt-BR');

    let messageCode: ApiErrorCodeEnum = ApiErrorCodeEnum.INTERNAL_SERVER_ERROR;
    let group: TranslationGroup = TranslationGroup.ERRORS;
    let data: any = null;

    // Caso especial: I18nValidationException
    if (exception instanceof I18nValidationException) {
      messageCode = ApiErrorCodeEnum.VALIDATION_ERROR;
      group = TranslationGroup.VALIDATION;

      data = {
        fieldErrors: exception.errors
          .map((error) => {
            const messages = Object.values(error.constraints || {});
            return messages.map((msg) => ({
              field: error.property,
              message: msg,
            }));
          })
          .flat(),
      };

      response.status(HttpStatus.BAD_REQUEST).json(BaseResponse.error(group, messageCode, data, lang));
      return;
    }

    // Demais HttpExceptions
    const exceptionResponse = exception.getResponse();

    // Mapeia status -> messageCode
    if (status === HttpStatus.NOT_FOUND) {
      messageCode = ApiErrorCodeEnum.NOT_FOUND;
    } else if (status === HttpStatus.UNAUTHORIZED) {
      messageCode = ApiErrorCodeEnum.UNAUTHORIZED;
    } else if (status === HttpStatus.FORBIDDEN) {
      messageCode = ApiErrorCodeEnum.FORBIDDEN;
    } else if (status === HttpStatus.BAD_REQUEST) {
      messageCode = ApiErrorCodeEnum.BAD_REQUEST;
    } else {
      // fallback para INTERNAL_SERVER_ERROR ou erroCode customizado
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null && 'errorCode' in exceptionResponse) {
        messageCode = (exceptionResponse as any).errorCode;
      } else {
        messageCode = ApiErrorCodeEnum.INTERNAL_SERVER_ERROR;
      }
    }

    // Monta data com reason se tiver
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const errorResp = exceptionResponse as any;
      const reason = errorResp.reason ?? errorResp.message ?? undefined;
      data = reason ? { reason } : null;
    } else if (typeof exceptionResponse === 'string') {
      data = { reason: exceptionResponse };
    }

    // Se for VALIDATION_ERROR, ajusta o group
    if (messageCode === ApiErrorCodeEnum.VALIDATION_ERROR) {
      group = TranslationGroup.VALIDATION;
    }

    response.status(status).json(BaseResponse.error(group, messageCode, data, lang));
  }
}
