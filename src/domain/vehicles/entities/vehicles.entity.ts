import { randomUUID } from 'node:crypto';

type VehicleProps = {
  id: string;
  licensePlate: string;
  chassis: string;
  renavam: string;
  year: number;
  modelId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateVehicleProps = {
  licensePlate: string;
  chassis: string;
  renavam: string;
  year: number;
  modelId: string;
  createdBy: string;
};

export class Vehicle {
  constructor(private readonly props: VehicleProps) {}

  static create(props: CreateVehicleProps): Vehicle {
    const now = new Date();

    const vehicle = new Vehicle({
      id: randomUUID(),
      licensePlate: props.licensePlate,
      chassis: props.chassis,
      renavam: props.renavam,
      year: props.year,
      modelId: props.modelId,
      createdBy: props.createdBy,
      createdAt: now,
      updatedAt: now,
    });

    vehicle.validate();

    return vehicle;
  }

  private validate(): void {
    if (!this.props.licensePlate?.trim()) {
      throw new Error('Placa do veículo é obrigatória.');
    }

    if (!this.props.chassis?.trim()) {
      throw new Error('Chassi do veículo é obrigatório.');
    }

    if (!this.props.renavam?.trim()) {
      throw new Error('Renavam do veículo é obrigatório.');
    }

    if (!this.props.modelId?.trim()) {
      throw new Error('Modelo do veículo é obrigatório.');
    }

    if (!this.props.createdBy?.trim()) {
      throw new Error('Criador do veículo é obrigatório.');
    }

    const currentYear = new Date().getFullYear();

    if (this.props.year < 1900 || this.props.year > currentYear + 1) {
      throw new Error('Ano do veículo é inválido.');
    }
  }

  static restore(props: VehicleProps): Vehicle {
    const vehicle = new Vehicle(props);
    vehicle.validate();

    return vehicle;
  }

  get id(): string {
    return this.props.id;
  }

  get licensePlate(): string {
    return this.props.licensePlate;
  }

  get chassis(): string {
    return this.props.chassis;
  }

  get renavam(): string {
    return this.props.renavam;
  }

  get year(): number {
    return this.props.year;
  }

  get modelId(): string {
    return this.props.modelId;
  }

  get createdBy(): string {
    return this.props.createdBy;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toObject(): VehicleProps {
    return {
      id: this.id,
      licensePlate: this.licensePlate,
      chassis: this.chassis,
      renavam: this.renavam,
      year: this.year,
      modelId: this.modelId,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
