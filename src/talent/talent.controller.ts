import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TalentService } from './talent.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { Talent } from './entities/talent.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Exceptions } from '../global/exceptions';

@ApiTags('Talents')
@ApiBearerAuth()
@Controller('talent')
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @Post()
  async create(@Body() createTalentDto: CreateTalentDto): Promise<Talent> {
    return await this.talentService.create(createTalentDto);
  }

  @Get()
  async findAll() {
    return await this.talentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return (
      (await this.talentService.findOne(id)) ||
      Exceptions.resourceNotFound('not found')
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTalentDto: UpdateTalentDto) {
    return await this.talentService.update(id, updateTalentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.talentService.remove(id);
  }
}
