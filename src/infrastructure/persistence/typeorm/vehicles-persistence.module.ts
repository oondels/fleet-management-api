import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VEHICLE_REPOSITORY } from 'src/domain/vehicles/repositories/vehicle.repository';

import { VehicleTypeOrmEntity } from './entities/vehicle.typeorm-entity';
import { VehicleModelTypeOrmEntity } from './entities/vehicle-model.typeorm-entity';
import { TypeOrmVehicleRepository } from './repositories/typeorm-vehicle.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleTypeOrmEntity, VehicleModelTypeOrmEntity]),
  ],
  providers: [
    {
      provide: VEHICLE_REPOSITORY,
      useClass: TypeOrmVehicleRepository,
    },
  ],
  exports: [VEHICLE_REPOSITORY],
})
export class TypeOrmVehiclesPersistenceModule {}
