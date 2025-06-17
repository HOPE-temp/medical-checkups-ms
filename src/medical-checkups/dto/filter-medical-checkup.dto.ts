import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsPositive, Min } from 'class-validator';
import { StatusMedicalCheckup } from '../models/medialCheckup.status.model';

export class FilterMedicalCheckupDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'Count of items return' })
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ description: 'Shik to start return' })
  offset: number;

  @IsPositive()
  @IsPositive()
  animalId: number;

  @IsOptional()
  @IsEnum(StatusMedicalCheckup)
  status: StatusMedicalCheckup;
}
