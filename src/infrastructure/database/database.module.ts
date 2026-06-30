import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { typeOrmConfigFactory } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfigFactory,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
