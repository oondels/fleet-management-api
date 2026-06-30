import 'dotenv/config';
import { join } from 'node:path';

import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mssql',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 1433),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA ?? 'dbo',

  entities: [
    join(
      __dirname,
      '..',
      'persistence',
      'typeorm',
      'entities',
      '*.typeorm-entity{.ts,.js}',
    ),
  ],

  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],

  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',

  requestTimeout: Number(process.env.DB_REQUEST_TIMEOUT ?? 15000),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false',
    connectTimeout: Number(process.env.DB_CONNECTION_TIMEOUT ?? 15000),
  },
});
