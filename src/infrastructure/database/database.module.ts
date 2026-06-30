import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfigFactory } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfigFactory,
      inject: [],
    }),
  ],
})
export class DatabaseModule {}
