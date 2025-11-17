import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { DashboardData } from './DashboardData';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string; // Optional password for authentication

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => DashboardData, (dashboardData) => dashboardData.customer)
  dashboardData: DashboardData[];
}
