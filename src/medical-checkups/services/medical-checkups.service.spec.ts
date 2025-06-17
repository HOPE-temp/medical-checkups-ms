import { Test, TestingModule } from '@nestjs/testing';
import { MedicalCheckupService } from './medical-checkups.service';

describe('MedicalCheckupService', () => {
  let service: MedicalCheckupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalCheckupService],
    }).compile();

    service = module.get<MedicalCheckupService>(MedicalCheckupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
