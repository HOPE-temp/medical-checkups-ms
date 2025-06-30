import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsPositive, Min } from 'class-validator';
import { StatusMedicalCheckup } from '../models/medicalCheckup.status.model';

export class FilterMedicalCheckupDto {
  @ApiPropertyOptional({ example: 10, description: 'Cantidad de registros a devolver' })
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiPropertyOptional({ example: 0, description: 'Offset para paginación' })
  @IsOptional()
  @Min(0)
  offset: number;

  @ApiPropertyOptional({ example: 1, description: 'Filtrar por ID de animal' })
  @IsOptional()
  @IsPositive()
  animalId: number;

  @ApiPropertyOptional({ example: 'COMPLETED', enum: StatusMedicalCheckup, description: 'Filtrar por estado del chequeo' })
  @IsOptional()
  @IsEnum(StatusMedicalCheckup)
  status: StatusMedicalCheckup;
}
