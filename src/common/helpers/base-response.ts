import { TranslationGroup } from '../enums/translation-group.enum';
import { TranslationService } from '../services/translation.service';

export interface IBaseResponse<T> {
  success: boolean;
  message: string;
  messageCode: string;
  data: T | null;
}

export class BaseResponse {
  static ok<T>(data: T, group: TranslationGroup, messageCode: string, lang?: string): IBaseResponse<T> {
    const translatedMessage = TranslationService.getMessage(group, messageCode, lang);

    return {
      success: true,
      message: translatedMessage,
      messageCode,
      data: data ?? null,
    };
  }

  static error<T = any>(group: TranslationGroup, messageCode: string, data?: T, lang = 'pt-BR'): IBaseResponse<T> {
    const translatedMessage = TranslationService.getMessage(group, messageCode, lang);

    return {
      success: false,
      message: translatedMessage,
      messageCode,
      data: data ?? null,
    };
  }
}
