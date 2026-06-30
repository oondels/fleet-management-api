import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserTypeOrmEntity } from './user.typeorm-entity';
import { VehicleBrandTypeOrmEntity } from './vehicle-brand.typeorm-entity';

@Entity('models')
export class VehicleModelTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name!: string;

  @Column({ name: 'brand_id', type: 'uniqueidentifier', nullable: true })
  brandId!: string | null;

  @ManyToOne(() => VehicleBrandTypeOrmEntity, { nullable: true })
  @JoinColumn({ name: 'brand_id' })
  brand!: VehicleBrandTypeOrmEntity | null;

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
