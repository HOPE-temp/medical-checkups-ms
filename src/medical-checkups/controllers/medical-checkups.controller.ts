import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { MedicalCheckupService } from '../services/medical-checkups.service';
import { CreateMedicalCheckupDto } from '../dto/create-medical-checkup.dto';
import {
  UpdateEndCheckup,
  UpdateMedicalCheckupDto,
} from '../dto/update-medical-checkup.dto';
import { Request } from 'express';
import { PayloadToken } from 'src/auth/models/token.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FilterMedicalCheckupDto } from '../dto/filter-medical-checkup.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleUser } from 'src/auth/models/roles.model';
import { ApiOperation } from '@nestjs/swagger';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
//Agregado
@ApiTags('Medical Checkups')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('medical_checkups')
//---
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('medical_checkups')
export class MedicalCheckupController {
  constructor(private readonly medicalCheckupService: MedicalCheckupService) {}

  @Roles(RoleUser.ADMIN, RoleUser.VETERINARIAN)
  @Post()
  @ApiOperation({ summary: 'Register an medical checkup' })
  create(@Body() createMedicalCheckupDto: CreateMedicalCheckupDto) {
    return this.medicalCheckupService.create(createMedicalCheckupDto);
  }

  @Roles(RoleUser.ADMIN, RoleUser.VETERINARIAN)
  @Get()
  @ApiOperation({ summary: 'Get list of medical checkups' })
  findAll(@Query() params?: FilterMedicalCheckupDto) {
    return this.medicalCheckupService.findAll(params);
  }

  @Roles(RoleUser.ADMIN, RoleUser.VETERINARIAN)
  @Get(':id')
  @ApiOperation({ summary: 'Get a  medical checkup by Id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicalCheckupService.findOne(id);
  }

  @Roles(RoleUser.VETERINARIAN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update medical checkup' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicalCheckupDto: UpdateMedicalCheckupDto,
  ) {
    return this.medicalCheckupService.update(id, updateMedicalCheckupDto);
  }

  @Roles(RoleUser.VETERINARIAN)
  @Put(':id/start_checkup')
  @ApiOperation({ summary: 'Start medical checkup' })
  startCheckup(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    const { sub } = request.user as PayloadToken;
    return this.medicalCheckupService.startCheckup(id, sub);
  }

  @Roles(RoleUser.VETERINARIAN)
  @Put(':id/end_checkup')
  @ApiOperation({ summary: 'End medical checkup' })
  endCheckup(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEndCheckup: UpdateEndCheckup,
    @Req() request: Request,
  ) {
    const { sub } = request.user as PayloadToken;
    return this.medicalCheckupService.endCheckup(id, updateEndCheckup);
  }

  @Roles(RoleUser.ADMIN, RoleUser.VETERINARIAN)
  @Delete(':id/end_checkup')
  @ApiOperation({ summary: 'Delete medical checkup' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicalCheckupService.remove(id);
  }
}
