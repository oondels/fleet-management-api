import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { VehicleModelTypeOrmEntity } from './vehicle-model.typeorm-entity';
import { UserTypeOrmEntity } from './user.typeorm-entity';

@Entity('vehicles')
export class VehicleTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'license_plate', type: 'varchar', length: 10, unique: true })
  licensePlate!: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  chassis!: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  renavam!: string;

  @Column({ type: 'int' })
  year!: number;

  @Column({ name: 'model_id', type: 'uniqueidentifier' })
  modelId!: string;

  @ManyToOne(() => VehicleModelTypeOrmEntity, { nullable: false })
  @JoinColumn({ name: 'model_id' })
  model!: VehicleModelTypeOrmEntity;

  @Column({ name: 'created_by', type: 'uniqueidentifier' })
  createdBy!: string;

  @ManyToOne(() => UserTypeOrmEntity, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdByUser!: UserTypeOrmEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime2' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime2' })
  updatedAt!: Date;
}
