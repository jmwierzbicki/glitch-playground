import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Skills')
@ApiBearerAuth()
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto) {
    return await this.skillService.create(createSkillDto);
  }

  @Get()
  async findAll() {
    return await this.skillService.findAll();
  }

  @Get('test')
  async test() {
    return 'test';
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.skillService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return await this.skillService.update(id, updateSkillDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.skillService.remove(id);
  }
}
