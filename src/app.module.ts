import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation';

import { AppController } from './app.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    DatabaseModule,
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
