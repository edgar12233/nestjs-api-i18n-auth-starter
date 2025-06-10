import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class I18nValidationException extends BadRequestException {
  constructor(public readonly errors: ValidationError[]) {
    super();
  }
}
