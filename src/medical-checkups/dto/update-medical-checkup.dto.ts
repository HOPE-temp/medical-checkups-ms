import { PartialType } from '@nestjs/swagger';
import { CreateMedicalCheckupDto } from './create-medical-checkup.dto';
import { IsDecimalWithPrecision } from 'src/common/validators/is-decimal-with-precision.validator';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMedicalCheckupDto extends PartialType(CreateMedicalCheckupDto) {}

export class UpdateEndCheckup {
  @ApiPropertyOptional({ example: 5.25, description: 'Peso del animal en kilogramos' })
  @IsOptional()
  @IsDecimalWithPrecision(6, 2)
  weightKg: number;

  @ApiPropertyOptional({ example: 38.5, description: 'Temperatura corporal en °C' })
  @IsOptional()
  @IsDecimalWithPrecision(6, 2)
  temperatureC: number;

  @ApiPropertyOptional({ example: 'El animal presentó signos de fiebre...', description: 'Observaciones médicas' })
  @IsOptional()
  @IsString()
  @MaxLength(450)
  observations: string;

  @ApiPropertyOptional({ example: 'Diagnóstico preliminar: infección viral', description: 'Diagnóstico médico' })
  @IsOptional()
  @IsString()
  @MaxLength(450)
  diagnosis: string;

  @ApiPropertyOptional({ example: 'Iniciar tratamiento con antibióticos por 5 días', description: 'Tratamiento indicado' })
  @IsOptional()
  @IsString()
  @MaxLength(450)
  treatment: string;
}
