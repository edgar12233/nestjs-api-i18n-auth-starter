import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private lang = 'pt-BR';

  setLang(lang: string) {
    this.lang = lang || 'pt-BR';
  }

  getLang(): string {
    return this.lang;
  }
}
