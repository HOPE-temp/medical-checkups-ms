import { PartialType } from '@nestjs/swagger';
import { CreateMedicalCheckupDto } from './create-medical-checkup.dto';
import { IsDecimal, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsDecimalWithPrecision } from 'src/common/validators/is-decimal-with-precision.validator';

export class UpdateMedicalCheckupDto extends PartialType(
  CreateMedicalCheckupDto,
) {}

export class UpdateEndCheckup {
  @IsOptional()
  @IsDecimalWithPrecision(6, 2)
  weightKg: number;

  @IsOptional()
  @IsDecimalWithPrecision(6, 2)
  temperatureC: number;

  @IsOptional()
  @IsString()
  @MaxLength(450)
  observations: string;

  @IsOptional()
  @IsString()
  @MaxLength(450)
  diagnosis: string;

  @IsOptional()
  @IsString()
  @MaxLength(450)
  treatment: string;
}
