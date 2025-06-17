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

export class CreateMedicalCheckupDto {
  @IsPositive()
  @IsNotEmpty()
  animalId: number;

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
      return `${constraints}La fecha debe ser mayor al momento actual (incluyendo la hora)`;
    },
  })
  scheduleStartAt: Date;

  @Type(() => Date)
  @IsDate()
  @ValidateIf((item) => item.scheduleStartAt, {
    message: 'Debe exitri scheduleStartAt',
  })
  @IsAfter('scheduleStartAt')
  scheduleEndAt: Date;
}
