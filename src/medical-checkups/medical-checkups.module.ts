import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicalCheckupService } from './services/medical-checkups.service';
import { MedicalCheckupController } from './controllers/medical-checkups.controller';
import { MedicalCheckup } from './entities/medical-checkup.entity';

// Importaciones relativas mientras todo está en un mismo proyecto
//import { UsersModule } from '../../../users-ms/src/users/users.module';
//import { AnimalsModule } from '../../../animal-ms/src/animals/animals.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalCheckup]), // 
  ],
  
  controllers: [MedicalCheckupController],
  providers: [MedicalCheckupService],
  exports: [MedicalCheckupService],
})
export class MedicalCheckupModule {}
