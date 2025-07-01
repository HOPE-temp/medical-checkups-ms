
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusMedicalCheckup } from '../models/medicalCheckup.status.model';

@Entity('medical_checkups')
export class MedicalCheckup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'animal_id',
    nullable: false
  })
  animalId: number;

  @Column({
    name: 'veterinarian_id',
    nullable: true
  })
  veterinarian: number;

  @Column({
    type: 'enum',
    enum: StatusMedicalCheckup,
    default: StatusMedicalCheckup.REGISTERED,
    nullable: false,
  })
  status: StatusMedicalCheckup;

  @Column({
    name: 'schedule_start_at',
    type: 'datetime',
    nullable: true,
  })
  scheduleStartAt: Date;

  @Column({
    name: 'schedule_end_at',
    type: 'datetime',
    nullable: true,
  })
  scheduleEndAt: Date;

  @Column({
    name: 'checkup_at',
    type: 'datetime',
    nullable: true,
  })
  checkupAt: Date;

  @Column({
    name: 'weight_kg',
    type: 'float',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  weightKg: number;

  @Column({
    name: 'temperature_c',
    type: 'float',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  temperatureC: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  observations: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  diagnosis: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  treatment: string;

  @Column({
    name: 'chechup_image_url',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  chechupImageUrl: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
/**
 * @ManyToOne(() => Animal, (animal) => animal.medicalCheckups)
@JoinColumn({ name: 'animal_id' })
animal: Animal;
 */