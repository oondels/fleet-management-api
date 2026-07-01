import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FindVehicleByChassisUseCase } from 'src/application/useCases/find-vehicle-by-chassis.use-case';
import { FindVehicleByIdUseCase } from 'src/application/useCases/find-vehicle-by-id.use-case';
import { FindVehicleByLicensePlateUseCase } from 'src/application/useCases/find-vehicle-by-license-plate.use-case';
import { FindVehicleByRenavamUseCase } from 'src/application/useCases/find-vehicle-by-renavam.use-case';
import { ListVehiclesUseCase } from 'src/application/useCases/list-vehicles.use-case';

export class ListVehiclesQueryDto {
  page?: string;
  limit?: string;
  year?: string;
  created_by?: string;
}

@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly listVehiclesUseCase: ListVehiclesUseCase,
    private readonly findVehicleByIdUseCase: FindVehicleByIdUseCase,
    private readonly findVehicleByLicensePlateUseCase: FindVehicleByLicensePlateUseCase,
    private readonly findVehicleByChassisUseCase: FindVehicleByChassisUseCase,
    private readonly findVehicleByRenavamUseCase: FindVehicleByRenavamUseCase,
  ) {}

  @Get()
  async listVehicles(@Query() query: ListVehiclesQueryDto) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const year = query.year ? Number(query.year) : undefined;

    const vehicles = await this.listVehiclesUseCase.execute({
      page,
      limit,
      year,
      createdBy: query.created_by,
    });

    return vehicles.map((vehicle) => vehicle.toObject());
  }

  @Get('license-plate/:licensePlate')
  async findByLicensePlate(@Param('licensePlate') licensePlate: string) {
    const vehicle =
      await this.findVehicleByLicensePlateUseCase.execute(licensePlate);

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado.');
    }

    return vehicle.toObject();
  }

  @Get('chassis/:chassis')
  async findByChassis(@Param('chassis') chassis: string) {
    const vehicle = await this.findVehicleByChassisUseCase.execute(chassis);

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado.');
    }

    return vehicle.toObject();
  }

  @Get('renavam/:renavam')
  async findByRenavam(@Param('renavam') renavam: string) {
    const vehicle = await this.findVehicleByRenavamUseCase.execute(renavam);

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado.');
    }

    return vehicle.toObject();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const vehicle = await this.findVehicleByIdUseCase.execute(id);

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado.');
    }

    return vehicle.toObject();
  }

  @Post()
  createVehicle() {
    return { message: 'Vehicle created' };
  }

  @Patch(':id')
  updateVehicle(@Param('id') id: string) {
    return { message: 'Vehicle updated', id };
  }

  @Delete(':id')
  deleteVehicle(@Param('id') id: string) {
    return { message: 'Vehicle deleted', id };
  }
}
