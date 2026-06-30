import { Vehicle } from 'src/domain/vehicles/entities/vehicles.entity';
import { VehicleTypeOrmEntity } from '../entities/vehicle.typeorm-entity';

export class VehicleMapper {
  static toDomain(entity: VehicleTypeOrmEntity): Vehicle {
    return Vehicle.restore({
      id: entity.id,
      licensePlate: entity.licensePlate,
      chassis: entity.chassis,
      renavam: entity.renavam,
      year: entity.year,
      modelId: entity.modelId,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toPersistence(vehicle: Vehicle): VehicleTypeOrmEntity {
    const entity = new VehicleTypeOrmEntity();
    entity.id = vehicle.id;
    entity.licensePlate = vehicle.licensePlate;
    entity.chassis = vehicle.chassis;
    entity.renavam = vehicle.renavam;
    entity.year = vehicle.year;
    entity.modelId = vehicle.modelId;
    entity.createdBy = vehicle.createdBy;
    entity.createdAt = vehicle.createdAt;
    entity.updatedAt = vehicle.updatedAt;

    return entity;
  }
}
