import { ValidationPipe, ValidationPipeOptions, ValidationError } from '@nestjs/common';
import { I18nValidationException } from '../exceptions/i18n-validation.exception';
import { RequestContext } from '../context/request-context';
import { TranslationService } from '../services/translation.service';

export class I18nextValidationPipe extends ValidationPipe {
  constructor(options: ValidationPipeOptions = {}) {
    super({
      ...options,
      exceptionFactory: (errors: ValidationError[]) => {
        const lang = RequestContext.get('lang') || 'pt-BR';

        const translated = errors.map((error) => ({
          ...error,
          constraints: Object.entries(error.constraints || {}).reduce(
            (acc, [key, _value]) => {
              const args = I18nextValidationPipe.getConstraintArgs(key, error, error.contexts?.[key] || {});
              acc[key] = TranslationService.translate(key, lang, args);
              return acc;
            },
            {} as Record<string, string>,
          ),
        }));

        return new I18nValidationException(translated);
      },
    });
  }

  // Mapeia os args para constraints que precisam de parâmetros
  private static getConstraintArgs(
    key: string,
    error: ValidationError,
    existingArgs: Record<string, unknown>,
  ): Record<string, unknown> {
    switch (key) {
      case 'minLength':
        return {
          min: existingArgs.min ?? this.extractNumberFromContextOrMessage('min', error, key),
        };

      case 'maxLength':
        return {
          max: existingArgs.max ?? this.extractNumberFromContextOrMessage('max', error, key),
        };

      case 'min':
        return {
          min: existingArgs.min ?? this.extractNumberFromContextOrMessage('min', error, key),
        };

      case 'max':
        return {
          max: existingArgs.max ?? this.extractNumberFromContextOrMessage('max', error, key),
        };

      case 'length':
        return {
          length: existingArgs.length ?? this.extractNumberFromContextOrMessage('length', error, key),
        };

      case 'equals':
        return {
          comparison:
            existingArgs.comparison ??
            error.contexts?.[key]?.comparison ??
            (error?.constraints ? this.extractComparisonFromMessage(error.constraints[key]) : undefined),
        };

      default:
        // Para os demais, retorna args já existentes (ou vazio)
        return existingArgs;
    }
  }

  // Helper para extrair número de context ou fallback no texto da mensagem
  private static extractNumberFromContextOrMessage(
    argName: string,
    error: ValidationError,
    key: string,
  ): number | undefined {
    const fromContext = error.contexts?.[key]?.[argName];
    if (fromContext !== undefined) {
      return Number(fromContext);
    }

    return this.extractLimitFromMessage(error.constraints?.[key]);
  }

  // Fallback para tentar extrair número de mensagem de erro do constraint
  private static extractLimitFromMessage(message?: string): number | undefined {
    if (!message) return undefined;

    const match = message.match(/\d+/);
    return match ? parseInt(match[0], 10) : undefined;
  }

  // Fallback para equals → tenta extrair string de comparação
  private static extractComparisonFromMessage(message?: string): string | undefined {
    if (!message) return undefined;

    // Exemplo: "must be equal to 'SOMEVALUE'"
    const match = message.match(/'([^']+)'/);
    return match ? match[1] : undefined;
  }
}
