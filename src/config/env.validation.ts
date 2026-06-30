import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  PORT: Joi.number().default(3000),

  DB_TYPE: Joi.string().valid('mssql').default('mssql'),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(1433),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SCHEMA: Joi.string().default('dbo'),

  DB_SYNCHRONIZE: Joi.boolean().default(false),
  DB_LOGGING: Joi.boolean().default(false),
  DB_ENCRYPT: Joi.boolean().default(false),
  DB_TRUST_SERVER_CERTIFICATE: Joi.boolean().default(true),

  DB_CONNECTION_TIMEOUT: Joi.number().default(15000),
  DB_REQUEST_TIMEOUT: Joi.number().default(15000),
});
