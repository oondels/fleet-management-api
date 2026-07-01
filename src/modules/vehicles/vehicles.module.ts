import { Module } from '@nestjs/common';

import { TypeOrmVehiclesPersistenceModule } from 'src/infrastructure/persistence/typeorm/vehicles-persistence.module';
import { VehiclesController } from './vehicles.controller';
import { FindVehicleByChassisUseCase } from 'src/application/useCases/find-vehicle-by-chassis.use-case';
import { FindVehicleByIdUseCase } from 'src/application/useCases/find-vehicle-by-id.use-case';
import { FindVehicleByLicensePlateUseCase } from 'src/application/useCases/find-vehicle-by-license-plate.use-case';
import { FindVehicleByRenavamUseCase } from 'src/application/useCases/find-vehicle-by-renavam.use-case';
import { ListVehiclesUseCase } from 'src/application/useCases/list-vehicles.use-case';

@Module({
  imports: [TypeOrmVehiclesPersistenceModule],
  controllers: [VehiclesController],
  providers: [
    ListVehiclesUseCase,
    FindVehicleByIdUseCase,
    FindVehicleByLicensePlateUseCase,
    FindVehicleByChassisUseCase,
    FindVehicleByRenavamUseCase,
  ],
})
export class VehiclesModule {}
