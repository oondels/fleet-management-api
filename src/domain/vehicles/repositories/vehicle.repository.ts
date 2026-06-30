import { Vehicle } from '../entities/vehicles.entity';

export const VEHICLE_REPOSITORY = Symbol('VEHICLE_REPOSITORY');

export interface VehicleRepository {
  create(vehicle: Vehicle): Promise<Vehicle>;
  update(vehicle: Vehicle): Promise<Vehicle>;
  findAll(): Promise<Vehicle[]>;
  findById(id: string): Promise<Vehicle | null>;
  findByLicensePlate(licensePlate: string): Promise<Vehicle | null>;
  findByChassis(chassis: string): Promise<Vehicle | null>;
  findByRenavam(renavam: string): Promise<Vehicle | null>;
  delete(id: string): Promise<void>;
}
