import { Module } from '@nestjs/common';

import { TypeOrmVehiclesPersistenceModule } from 'src/infrastructure/persistence/typeorm/vehicles-persistence.module';
import { VehiclesController } from './vehicles.controller';
import { ListVehiclesUseCase } from 'src/application/useCases/list-vehicles.use-case';

@Module({
  imports: [TypeOrmVehiclesPersistenceModule],
  controllers: [VehiclesController],
  providers: [ListVehiclesUseCase],
})
export class VehiclesModule {}
