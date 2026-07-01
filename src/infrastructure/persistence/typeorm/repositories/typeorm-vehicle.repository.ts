import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

import { VehicleRepository, ListVehiclesInput } from 'src/domain/vehicles/repositories/vehicle.repository';
import { Vehicle } from 'src/domain/vehicles/entities/vehicles.entity';
import { VehicleTypeOrmEntity } from '../entities/vehicle.typeorm-entity';
import { VehicleMapper } from '../mappers/vehicle.mapper';

@Injectable()
export class TypeOrmVehicleRepository implements VehicleRepository {
  constructor(
    @InjectRepository(VehicleTypeOrmEntity)
    private readonly vehicleRepository: Repository<VehicleTypeOrmEntity>,
  ) {}

  async create(vehicle: Vehicle): Promise<Vehicle> {
    const persistenceVehicle = VehicleMapper.toPersistence(vehicle);
    const createdVehicle =
      await this.vehicleRepository.save(persistenceVehicle);
    return VehicleMapper.toDomain(createdVehicle);
  }

  async update(vehicle: Vehicle): Promise<Vehicle> {
    const persistenceVehicle = VehicleMapper.toPersistence(vehicle);
    const updatedVehicle =
      await this.vehicleRepository.save(persistenceVehicle);
    return VehicleMapper.toDomain(updatedVehicle);
  }

  async findAll(input: ListVehiclesInput): Promise<Vehicle[]> {
    const where: FindOptionsWhere<VehicleTypeOrmEntity> = {};

    if (input.year) {
      where.year = input.year;
    }

    if (input.createdBy) {
      where.createdBy = input.createdBy;
    }

    const findOptions: FindManyOptions<VehicleTypeOrmEntity> = {
      where,
      relations: {
        model: true,
        createdByUser: true,
      },
      order: { createdAt: 'DESC' },
      skip: (input.page - 1) * input.limit,
      take: input.limit,
    };

    const vehicles = await this.vehicleRepository.find(findOptions);
    return vehicles.map((vehicle) => VehicleMapper.toDomain(vehicle));
  }

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: {
        model: true,
        createdByUser: true,
      },
    });
    return vehicle ? VehicleMapper.toDomain(vehicle) : null;
  }

  async findByLicensePlate(licensePlate: string): Promise<Vehicle | null> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { licensePlate },
      relations: {
        model: true,
        createdByUser: true,
      },
    });
    return vehicle ? VehicleMapper.toDomain(vehicle) : null;
  }

  async findByChassis(chassis: string): Promise<Vehicle | null> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { chassis },
      relations: {
        model: true,
        createdByUser: true,
      },
    });
    return vehicle ? VehicleMapper.toDomain(vehicle) : null;
  }

  async findByRenavam(renavam: string): Promise<Vehicle | null> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { renavam },
      relations: {
        model: true,
        createdByUser: true,
      },
    });
    return vehicle ? VehicleMapper.toDomain(vehicle) : null;
  }

  async delete(id: string): Promise<void> {
    await this.vehicleRepository.delete({ id });
  }
}
