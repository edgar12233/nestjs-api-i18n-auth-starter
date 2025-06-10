# nestjs-api-i18n-auth-starter

A modern, ready-to-use starter project for building multilingual, well-structured REST APIs with NestJS.

✨ **Features:**

- 🌐 Internationalization (i18n) using [i18next](https://www.i18next.com/)
- ✅ Centralized validation error handling with dynamic message interpolation
- 🛡️ Global `HttpExceptionFilter` with consistent API error responses
- 🗣️ `Accept-Language` header support via a `LanguageInterceptor`
- 🗃️ `RequestContext` for per-request language scoping
- 🔐 Google OAuth login flow
- 📚 Clean and extensible `TranslationService` using i18next core
- 🚀 Designed to be lightweight and free of unnecessary dependencies (no `nestjs-i18n` package required)

---

## Motivation

Most i18n NestJS examples rely on [`nestjs-i18n`](https://github.com/toonvanstrijp/nestjs-i18n), which is great but often overkill for APIs.
This starter project demonstrates a lightweight, fully controlled way to integrate:

- i18next directly
- Validation with dynamic placeholders (e.g., `{{max}}`, `{{min}}`, `{{length}}`)
- Clean API response patterns
- Authentication via Google OAuth

---

## Architecture Highlights

- ✅ **TranslationService** — wraps and initializes `i18next`
- ✅ **I18nextValidationPipe** — extends `ValidationPipe`, adds automatic arg completion for common constraints (`minLength`, `maxLength`, `equals`, `length`, etc.)
- ✅ **HttpExceptionFilter** — consistent error responses with proper translation
- ✅ **LanguageInterceptor** — populates `RequestContext.lang` based on `Accept-Language` header
- ✅ **Validation messages** — stored in `i18n/{{lng}}/validation.json`
- ✅ **Google OAuth** — integrated as a flexible auth provider

---

## Folder structure

```
src/
├── common/
│   ├── context/              → RequestContext
│   ├── exceptions/           → I18nValidationException
│   ├── filters/              → HttpExceptionFilter
│   ├── interceptors/         → LanguageInterceptor
│   ├── pipes/                → I18nextValidationPipe
│   ├── services/             → TranslationService
│   └── helpers/              → Utility helpers (BaseResponse, etc.)
├── enums/                    → Translation groups, API error codes
├── i18n/                     → Translations (validation.json, messages.json)
└── auth/                     → Google OAuth flow, DTOs, controllers
```

---

## Usage

### Validation example (LoginDto)

```typescript
@MaxLength(10)
@MinLength(6)
@IsNotEmpty()
@IsEmail()
```

- No need to pass `{ max }` or `{ min }` — handled automatically by `I18nextValidationPipe`.
- Validation messages pulled from `validation.json`.

---

### Example Validation Message

```json
{
  "fieldErrors": [
    {
      "field": "password",
      "message": "Must be at most 10 characters."
    }
  ]
}
```

---

## Why not use `nestjs-i18n`?

- Full control of `i18next` integration
- No additional package dependency
- Easier to fine-tune behavior for API-specific needs
- Works seamlessly with `ValidationPipe` and `HttpExceptionFilter`

---

## Roadmap

- ✅ i18n with i18next
- ✅ ValidationPipe auto-args
- ✅ BaseResponse + consistent API error contract
- ✅ Google OAuth login flow
- ✅ Ready for production use

🔧 Possible future improvements:

- i18n caching
- Multi-namespace support with dynamic loading
- Support for more advanced i18next plugins

---

## Getting Started

```bash
git clone https://github.com/iibalena/nestjs-api-i18n-auth-starter.git
cd nestjs-api-i18n-auth-starter
npm install
npm run start:dev
```

---

## License

MIT

---

## Contributing

Feel free to fork, star, and contribute via PRs!
Feedback and ideas are always welcome.

---

## Author

Developed by [Ivonei Balena](https://github.com/iibalena) with ❤️

---
