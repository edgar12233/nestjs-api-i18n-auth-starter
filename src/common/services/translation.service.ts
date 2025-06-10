import * as i18next from 'i18next';
import { i18n as I18nInstance } from 'i18next';
import * as Backend from 'i18next-fs-backend';
import * as path from 'path';
import { TranslationGroup } from '../enums/translation-group.enum';
import { RequestContext } from '../context/request-context';

export class TranslationService {
  private static instance: I18nInstance;

  static async init() {
    if (this.instance?.isInitialized) return;

    this.instance = i18next.createInstance();

    await this.instance.use(Backend as any).init({
      fallbackLng: 'pt-BR',
      defaultNS: 'messages',
      ns: ['messages', 'validation'],
      preload: [],
      backend: {
        loadPath: path.join(__dirname, '..', '..', 'i18n/{{lng}}/{{ns}}.json'),
      },
    });

    console.log('[TranslationService] i18next initialized');
  }

  static async preloadAllLanguages(languages: string[]) {
    console.log('[TranslationService] Preloading languages:', languages);

    if (!this.instance?.isInitialized) {
      throw new Error('TranslationService not initialized. Call TranslationService.init() first.');
    }

    await this.instance.loadLanguages(languages);
  }

  static getMessage(group: TranslationGroup, code: string, lang?: string): string {
    if (!this.instance?.isInitialized) {
      throw new Error('TranslationService not initialized. Call TranslationService.init() first.');
    }

    const lng = lang || RequestContext.get('lang') || 'pt-BR';
    return this.instance.t(`${group}.${code}`, { lng }) || '';
  }

  static translate(key: string, lang?: string, args?: Record<string, unknown>): string {
    if (!this.instance?.isInitialized) {
      throw new Error('TranslationService not initialized. Call TranslationService.init() first.');
    }

    const lng = lang || RequestContext.get('lang') || 'pt-BR';
    return (
      this.instance.t(key, {
        lng,
        ns: 'validation', // aqui forçamos o namespace validation
        ...args,
      }) || ''
    );
  }
}
