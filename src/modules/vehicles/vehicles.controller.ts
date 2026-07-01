import { Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ListVehiclesUseCase } from 'src/application/useCases/list-vehicles.use-case';

export class ListVehiclesQueryDto {
  page?: string;
  limit?: string;
  year?: string;
  created_by?: string;
}

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly listVehiclesUseCase: ListVehiclesUseCase) {}

  @Get()
  async listVehicles(@Query() query: ListVehiclesQueryDto) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const year = query.year ? Number(query.year) : undefined;
    
    const vehicles = await this.listVehiclesUseCase.execute({
      page,
      limit,
      year,
      createdBy: query.created_by
    });

    return vehicles.map((vehicle) => vehicle.toObject());
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
