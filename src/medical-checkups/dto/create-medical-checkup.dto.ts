import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  MinDate,
  ValidateIf,
} from 'class-validator';
import { IsAfter } from 'src/common/validators/is-after.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMedicalCheckupDto {
  @ApiProperty({ example: 1, description: 'ID del animal' })
  @IsPositive()
  @IsNotEmpty()
  animalId: number;

  @ApiPropertyOptional({ example: '2025-07-01T10:00:00Z', description: 'Fecha y hora programada de inicio' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date(), {
    message: ({ constraints }) => {
      if (constraints[0] instanceof Date) {
        const formateador = new Intl.DateTimeFormat('sv-SE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZoneName: 'short',
        });
        return `${formateador.format(constraints[0])} La fecha debe ser mayor al momento actual (incluyendo la hora)`;
      }
      return `${constraints} La fecha debe ser mayor al momento actual (incluyendo la hora)`;
    },
  })
  scheduleStartAt: Date;

  @ApiPropertyOptional({ example: '2025-07-01T11:00:00Z', description: 'Fecha y hora programada de fin' })
  @Type(() => Date)
  @IsDate()
  @ValidateIf((item) => item.scheduleStartAt)
  @IsAfter('scheduleStartAt')
  scheduleEndAt: Date;
}
