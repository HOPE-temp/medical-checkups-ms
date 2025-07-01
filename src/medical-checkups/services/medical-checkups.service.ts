import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { CreateMedicalCheckupDto } from '../dto/create-medical-checkup.dto';
import {
  UpdateEndCheckup,
  UpdateMedicalCheckupDto,
} from '../dto/update-medical-checkup.dto';
import { MedicalCheckup } from '../entities/medical-checkup.entity';
import { FilterMedicalCheckupDto } from '../dto/filter-medical-checkup.dto';
import { StatusMedicalCheckup } from '../models/medicalCheckup.status.model';
import { validateStatusFlow } from 'src/common/utils/statusFlow.util';
import { medialCheckupStatusFlow } from '../flows/medical-checkup.flow';

@Injectable()
export class MedicalCheckupService {
  constructor(
    @InjectRepository(MedicalCheckup)
    private medicalCheckupRepo: Repository<MedicalCheckup>,
  ) {}

  async create(createMedicalCheckupDto: CreateMedicalCheckupDto) {

    if (createMedicalCheckupDto.scheduleStartAt) {
      const registered = await this.medicalCheckupRepo.find({
        where: [
          {
            scheduleStartAt: Between(
              createMedicalCheckupDto.scheduleStartAt,
              createMedicalCheckupDto.scheduleEndAt,
            ),
          },
          {
            scheduleEndAt: Between(
              createMedicalCheckupDto.scheduleStartAt,
              createMedicalCheckupDto.scheduleEndAt,
            ),
          },
        ],
      });
      if (registered.length > 0) {
        throw new ConflictException('Hour reserved ');
      }
    }
    const medicalCheckup = this.medicalCheckupRepo.create({
      ...createMedicalCheckupDto,
    });
    const res = await this.medicalCheckupRepo.save(medicalCheckup);
    return res;
  }

  findAll(params?: FilterMedicalCheckupDto) {
    const options: FindManyOptions<MedicalCheckup> = {
      take: 10,
      skip: 0,
    };

    if (params) {
      const { animalId, status } = params;
      const { limit, offset } = params;

      const where: FindOptionsWhere<MedicalCheckup> = {};

      if (animalId) {
        where.animalId = animalId;
      }

      if (status) {
        where.status = status;
      }

      options.take = limit || 10;
      options.skip = offset || 0;
    }

    return this.medicalCheckupRepo.find(options);
  }

  async findOne(id: number) {
    const medicalCheckup = await this.medicalCheckupRepo.findOne({
      where: { id },
      relations: ['animal'],
    });

    if (!medicalCheckup) {
      throw new NotFoundException(`Medical checkup #${id} not found`);
    }
    return medicalCheckup;
  }

  async startCheckup(id: number, veterinarian: number) {

    const medicalCheckup = await this.findOne(id);
    this.updateStatusMedicalCheckup(
      medicalCheckup,
      StatusMedicalCheckup.IN_ATTENTION,
    );
    this.medicalCheckupRepo.merge(medicalCheckup, {
      veterinarian,
      checkupAt: new Date(),
    });

    const res = await this.medicalCheckupRepo.save(medicalCheckup);
    return res;
  }
//start checkup y endcheckup,  
  async endCheckup(id: number, updateEndCheckup: UpdateEndCheckup) {
    const medicalCheckup = await this.findOne(id);
    this.updateStatusMedicalCheckup(
      medicalCheckup,
      StatusMedicalCheckup.COMPLETED,
    );
    this.medicalCheckupRepo.merge(medicalCheckup, {
      ...updateEndCheckup,
    });

    const res = await this.medicalCheckupRepo.save(medicalCheckup);
    return res;
  }

  async cancelCheckup(id: number) {
    const medicalCheckup = await this.findOne(id);
    this.updateStatusMedicalCheckup(
      medicalCheckup,
      StatusMedicalCheckup.CANCELLED,
    );
    const res = await this.medicalCheckupRepo.save(medicalCheckup);
    return res;
  }

  async update(id: number, updateMedicalCheckupDto: UpdateMedicalCheckupDto) {
    const medicalCheckup = await this.findOne(id);
    this.medicalCheckupRepo.merge(medicalCheckup, {});
    const res = this.medicalCheckupRepo.save(medicalCheckup);
    return res;
  }

  async remove(id: number) {
    const medicalCheckup = await this.findOne(id);
    const res = await this.medicalCheckupRepo.softDelete(medicalCheckup);
    return res;
  }

  updateStatusMedicalCheckup(
    medicalCheckup: MedicalCheckup,
    status: StatusMedicalCheckup,
  ) {
    if (
      !validateStatusFlow(
        medicalCheckup.status,
        status,
        medialCheckupStatusFlow,
      )
    ) {
      throw new ConflictException(
        `new status is not validate: ${medicalCheckup.status} -> ${status}`,
      );
    }

    this.medicalCheckupRepo.merge(medicalCheckup, { status });
    return medicalCheckup;
  }
}
