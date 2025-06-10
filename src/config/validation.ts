import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  GOOGLE_CLIENT_ID_ANDROID: Joi.string().required(),
  GOOGLE_CLIENT_ID_IOS: Joi.string().required(),
});
