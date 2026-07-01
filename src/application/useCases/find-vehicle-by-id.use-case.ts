import { Inject, Injectable } from '@nestjs/common';

import {
  VEHICLE_REPOSITORY,
  type VehicleRepository,
} from 'src/domain/vehicles/repositories/vehicle.repository';

@Injectable()
export class FindVehicleByIdUseCase {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  execute(id: string) {
    return this.vehicleRepository.findById(id);
  }
}
