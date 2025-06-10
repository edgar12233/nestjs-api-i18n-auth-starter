import { ApiHeader } from '@nestjs/swagger';

export const ApiAcceptLanguageHeader = () =>
  ApiHeader({
    name: 'Accept-Language',
    description: 'Idioma desejado para as mensagens de resposta. Ex: pt-BR, en-US.',
    required: false,
    schema: {
      type: 'string',
      enum: ['pt-BR', 'en-US'],
      default: 'pt-BR',
    },
  });
