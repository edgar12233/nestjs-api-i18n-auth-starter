export function extractPrimaryLanguage(acceptLanguageHeader: string, defaultLang = 'pt-BR'): string {
  if (!acceptLanguageHeader) {
    return defaultLang;
  }

  const languages = acceptLanguageHeader.split(',').map((lang) => lang.split(';')[0].trim());
  return languages[0] || defaultLang;
}
