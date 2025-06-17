import { Module } from '@nestjs/common';
import { MedicalCheckupService } from './services/medical-checkups.service';
import { MedicalCheckupController } from './controllers/medical-checkups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalCheckup } from './entities/medical-checkup.entity';
import { UsersModule } from 'src/users/users.module';
import { AnimalsModule } from 'src/animals/animals.module';

@Module({
  imports: [
    UsersModule,
    AnimalsModule,
    TypeOrmModule.forFeature([MedicalCheckup]),
  ],
  controllers: [MedicalCheckupController],
  providers: [MedicalCheckupService],
  exports: [MedicalCheckupService],
})
export class MedicalCheckupModule {}
