import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environments } from './config/environments';
import { validationSchema } from './config/validationEnv';
import configEnv from './config/config';
import { DatabaseModule } from './database/database.module';
import { MedicalCheckupModule } from './medical-checkups/medical-checkups.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV || 'dev'],
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      load: [configEnv],
      validationSchema,
      isGlobal: true,
    }),
    DatabaseModule,              // Conexion a tu BD usando variables del .env
    MedicalCheckupModule,        // Microservicio de chequeos médicos
  ],
})
export class AppModule {}
