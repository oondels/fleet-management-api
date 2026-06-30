import { join } from 'node:path';

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfigFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'mssql',

    host: configService.getOrThrow<string>('DB_HOST'),
    port: configService.getOrThrow<number>('DB_PORT'),
    username: configService.getOrThrow<string>('DB_USERNAME'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    database: configService.getOrThrow<string>('DB_DATABASE'),
    schema: configService.get<string>('DB_SCHEMA', 'dbo'),

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

    synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
    logging: configService.get<boolean>('DB_LOGGING', false),

    requestTimeout: configService.get<number>('DB_REQUEST_TIMEOUT', 15000),
    options: {
      encrypt: configService.get<boolean>('DB_ENCRYPT', false),
      trustServerCertificate: configService.get<boolean>(
        'DB_TRUST_SERVER_CERTIFICATE',
        true,
      ),
      connectTimeout: configService.get<number>('DB_CONNECTION_TIMEOUT', 15000),
    },
  };
};
