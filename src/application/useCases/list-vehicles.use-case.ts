import { Inject, Injectable } from '@nestjs/common';

import {
  VEHICLE_REPOSITORY,
  type VehicleRepository, // 'import type' para evitar erro do TS em interfaces (TS1272). A injeção no NestJS segue segura através do Token.
} from 'src/domain/vehicles/repositories/vehicle.repository';

@Injectable()
export class ListVehiclesUseCase {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  execute() {
    return this.vehicleRepository.findAll();
  }
}
