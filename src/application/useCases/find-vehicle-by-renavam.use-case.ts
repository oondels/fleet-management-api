import { Inject, Injectable } from '@nestjs/common';

import {
  VEHICLE_REPOSITORY,
  type VehicleRepository,
} from 'src/domain/vehicles/repositories/vehicle.repository';

@Injectable()
export class FindVehicleByRenavamUseCase {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  execute(renavam: string) {
    return this.vehicleRepository.findByRenavam(renavam);
  }
}
