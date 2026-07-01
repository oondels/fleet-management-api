import { Inject, Injectable } from '@nestjs/common';

import {
  VEHICLE_REPOSITORY,
  type VehicleRepository,
} from 'src/domain/vehicles/repositories/vehicle.repository';

@Injectable()
export class FindVehicleByChassisUseCase {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  execute(chassis: string) {
    return this.vehicleRepository.findByChassis(chassis);
  }
}
