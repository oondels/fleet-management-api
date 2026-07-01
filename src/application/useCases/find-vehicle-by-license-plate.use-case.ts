import { Inject, Injectable } from '@nestjs/common';

import {
  VEHICLE_REPOSITORY,
  type VehicleRepository,
} from 'src/domain/vehicles/repositories/vehicle.repository';

@Injectable()
export class FindVehicleByLicensePlateUseCase {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  execute(licensePlate: string) {
    return this.vehicleRepository.findByLicensePlate(licensePlate);
  }
}
