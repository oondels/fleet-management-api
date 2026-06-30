import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import dataSource from './data-source';
import { UserTypeOrmEntity } from '../persistence/typeorm/entities/user.typeorm-entity';
import { VehicleBrandTypeOrmEntity } from '../persistence/typeorm/entities/vehicle-brand.typeorm-entity';
import { VehicleModelTypeOrmEntity } from '../persistence/typeorm/entities/vehicle-model.typeorm-entity';
import { VehicleTypeOrmEntity } from '../persistence/typeorm/entities/vehicle.typeorm-entity';

type SeedVehicleRecord = {
  license_plate: string;
  chassis: string;
  renavam: string;
  year: number;
  model: string;
  brand?: string;
};

// TODO: Após criar serviços de criação de usuários com configuração de senha, reaproveitar método de hash de senha do serviço de criação de usuário para criar o usuário seed com senha segura. Atualmente, a senha é salva em texto puro.
const SEED_USER_NICKNAME = 'aivacol';
const SEED_USER_EMAIL = 'aivacol@example.com';

async function readSeedVehicles(): Promise<SeedVehicleRecord[]> {
  const seedPath = resolve(process.cwd(), 'data', 'seed_vehicles.json');
  const file = await readFile(seedPath, 'utf8');
  const records = JSON.parse(file) as SeedVehicleRecord[];

  if (!Array.isArray(records)) {
    throw new Error(
      'seed_vehicles.json tem que ter um array válido de veículos.',
    );
  }

  for (const [index, record] of records.entries()) {
    if (
      !record.license_plate ||
      !record.chassis ||
      !record.renavam ||
      !record.year ||
      !record.model
    ) {
      throw new Error(`Seed de veículo inválido no índice ${index}.`);
    }
  }

  return records;
}

async function upsertSeedUser(): Promise<UserTypeOrmEntity> {
  const userRepository = dataSource.getRepository(UserTypeOrmEntity);

  const existingUser = await userRepository.findOne({
    where: [{ nickName: SEED_USER_NICKNAME }, { email: SEED_USER_EMAIL }],
  });

  if (existingUser) {
    return existingUser;
  }

  return userRepository.save(
    userRepository.create({
      nickName: SEED_USER_NICKNAME,
      name: 'Usuário padrão Aivacol',
      email: SEED_USER_EMAIL,
      password: process.env.SEED_USER_PASSWORD ?? 'aivacol', // TODO: Configurar hash posteriormente
    }),
  );
}

async function upsertBrands(
  records: SeedVehicleRecord[],
  createdBy: string,
): Promise<Map<string, VehicleBrandTypeOrmEntity>> {
  const brandRepository = dataSource.getRepository(VehicleBrandTypeOrmEntity);
  const brandNames = [
    ...new Set(
      records
        .map((record) => record.brand?.trim())
        .filter((brand): brand is string => Boolean(brand)),
    ),
  ];
  const brandsByName = new Map<string, VehicleBrandTypeOrmEntity>();

  for (const name of brandNames) {
    const existingBrand = await brandRepository.findOne({ where: { name } });

    const brand = existingBrand
      ? existingBrand
      : await brandRepository.save(
          brandRepository.create({
            name,
            createdBy,
          }),
        );

    brandsByName.set(name, brand);
  }

  return brandsByName;
}

async function upsertModels(
  records: SeedVehicleRecord[],
  createdBy: string,
): Promise<Map<string, VehicleModelTypeOrmEntity>> {
  const modelRepository = dataSource.getRepository(VehicleModelTypeOrmEntity);
  const modelNames = [...new Set(records.map((record) => record.model.trim()))];
  const modelsByName = new Map<string, VehicleModelTypeOrmEntity>();

  for (const name of modelNames) {
    const existingModel = await modelRepository.findOne({ where: { name } });

    const model = existingModel
      ? existingModel
      : await modelRepository.save(
          modelRepository.create({
            name,
            createdBy,
          }),
        );

    modelsByName.set(name, model);
  }

  return modelsByName;
}

async function upsertVehicles(
  records: SeedVehicleRecord[],
  modelsByName: Map<string, VehicleModelTypeOrmEntity>,
  createdBy: string,
): Promise<void> {
  const vehicleRepository = dataSource.getRepository(VehicleTypeOrmEntity);

  for (const record of records) {
    const model = modelsByName.get(record.model.trim());

    if (!model) {
      throw new Error(
        `Modelo não encontrado para o veículo ${record.license_plate}.`,
      );
    }

    const existingVehicle = await vehicleRepository.findOne({
      where: { licensePlate: record.license_plate },
    });

    await vehicleRepository.save(
      vehicleRepository.create({
        id: existingVehicle?.id,
        licensePlate: record.license_plate,
        chassis: record.chassis,
        renavam: record.renavam,
        year: record.year,
        modelId: model.id,
        createdBy,
      }),
    );
  }
}

async function bootstrapDatabase(): Promise<void> {
  await dataSource.initialize();

  try {
    const records = await readSeedVehicles();
    const seedUser = await upsertSeedUser();
    const brandsByName = await upsertBrands(records, seedUser.id);
    const modelsByName = await upsertModels(records, seedUser.id);

    await upsertVehicles(records, modelsByName, seedUser.id);

    console.log(
      `Seed concluída: Total de marcas ${brandsByName.size}, modelos ${modelsByName.size} e ${records.length} veículos.`,
    );
  } finally {
    await dataSource.destroy();
  }
}

bootstrapDatabase().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
