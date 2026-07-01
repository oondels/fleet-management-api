import { NotFoundException } from '@nestjs/common';

import { FindVehicleByChassisUseCase } from 'src/application/useCases/find-vehicle-by-chassis.use-case';
import { FindVehicleByIdUseCase } from 'src/application/useCases/find-vehicle-by-id.use-case';
import { FindVehicleByLicensePlateUseCase } from 'src/application/useCases/find-vehicle-by-license-plate.use-case';
import { FindVehicleByRenavamUseCase } from 'src/application/useCases/find-vehicle-by-renavam.use-case';
import { ListVehiclesUseCase } from 'src/application/useCases/list-vehicles.use-case';
import { Vehicle } from 'src/domain/vehicles/entities/vehicles.entity';
import { VehiclesController } from './vehicles.controller';

describe('VehiclesController', () => {
  let controller: VehiclesController;
  let listVehiclesUseCase: { execute: jest.Mock };
  let findVehicleByIdUseCase: { execute: jest.Mock };
  let findVehicleByLicensePlateUseCase: { execute: jest.Mock };
  let findVehicleByChassisUseCase: { execute: jest.Mock };
  let findVehicleByRenavamUseCase: { execute: jest.Mock };

  const vehicle = Vehicle.restore({
    id: 'vehicle-id',
    licensePlate: 'ABC1D23',
    chassis: '9BWZZZ377VT004251',
    renavam: '12345678901',
    year: 2024,
    modelId: 'model-id',
    createdBy: 'user-id',
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-02T00:00:00.000Z'),
  });

  beforeEach(() => {
    listVehiclesUseCase = { execute: jest.fn() };
    findVehicleByIdUseCase = { execute: jest.fn() };
    findVehicleByLicensePlateUseCase = { execute: jest.fn() };
    findVehicleByChassisUseCase = { execute: jest.fn() };
    findVehicleByRenavamUseCase = { execute: jest.fn() };

    controller = new VehiclesController(
      listVehiclesUseCase as unknown as ListVehiclesUseCase,
      findVehicleByIdUseCase as unknown as FindVehicleByIdUseCase,
      findVehicleByLicensePlateUseCase as unknown as FindVehicleByLicensePlateUseCase,
      findVehicleByChassisUseCase as unknown as FindVehicleByChassisUseCase,
      findVehicleByRenavamUseCase as unknown as FindVehicleByRenavamUseCase,
    );
  });

  describe('listVehicles', () => {
    it('should list vehicles with default pagination', async () => {
      listVehiclesUseCase.execute.mockResolvedValue([vehicle]);

      const result = await controller.listVehicles({});

      expect(listVehiclesUseCase.execute).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
        year: undefined,
        createdBy: undefined,
      });
      expect(result).toEqual([vehicle.toObject()]);
    });

    it('should list vehicles using query filters', async () => {
      listVehiclesUseCase.execute.mockResolvedValue([vehicle]);

      const result = await controller.listVehicles({
        page: '2',
        limit: '5',
        year: '2024',
        created_by: 'user-id',
      });

      expect(listVehiclesUseCase.execute).toHaveBeenCalledWith({
        page: 2,
        limit: 5,
        year: 2024,
        createdBy: 'user-id',
      });
      expect(result).toEqual([vehicle.toObject()]);
    });
  });

  describe('findById', () => {
    it('should return a vehicle by id', async () => {
      findVehicleByIdUseCase.execute.mockResolvedValue(vehicle);

      const result = await controller.findById('vehicle-id');

      expect(findVehicleByIdUseCase.execute).toHaveBeenCalledWith('vehicle-id');
      expect(result).toEqual(vehicle.toObject());
    });

    it('should throw NotFoundException when vehicle by id does not exist', async () => {
      findVehicleByIdUseCase.execute.mockResolvedValue(null);

      await expect(controller.findById('missing-id')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('findByLicensePlate', () => {
    it('should return a vehicle by license plate', async () => {
      findVehicleByLicensePlateUseCase.execute.mockResolvedValue(vehicle);

      const result = await controller.findByLicensePlate('ABC1D23');

      expect(findVehicleByLicensePlateUseCase.execute).toHaveBeenCalledWith(
        'ABC1D23',
      );
      expect(result).toEqual(vehicle.toObject());
    });

    it('should throw NotFoundException when vehicle by license plate does not exist', async () => {
      findVehicleByLicensePlateUseCase.execute.mockResolvedValue(null);

      await expect(
        controller.findByLicensePlate('MISSING'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('findByChassis', () => {
    it('should return a vehicle by chassis', async () => {
      findVehicleByChassisUseCase.execute.mockResolvedValue(vehicle);

      const result = await controller.findByChassis('9BWZZZ377VT004251');

      expect(findVehicleByChassisUseCase.execute).toHaveBeenCalledWith(
        '9BWZZZ377VT004251',
      );
      expect(result).toEqual(vehicle.toObject());
    });

    it('should throw NotFoundException when vehicle by chassis does not exist', async () => {
      findVehicleByChassisUseCase.execute.mockResolvedValue(null);

      await expect(controller.findByChassis('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('findByRenavam', () => {
    it('should return a vehicle by renavam', async () => {
      findVehicleByRenavamUseCase.execute.mockResolvedValue(vehicle);

      const result = await controller.findByRenavam('12345678901');

      expect(findVehicleByRenavamUseCase.execute).toHaveBeenCalledWith(
        '12345678901',
      );
      expect(result).toEqual(vehicle.toObject());
    });

    it('should throw NotFoundException when vehicle by renavam does not exist', async () => {
      findVehicleByRenavamUseCase.execute.mockResolvedValue(null);

      await expect(controller.findByRenavam('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
