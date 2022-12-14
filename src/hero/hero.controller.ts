import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, Request
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Hero, HeroDocument } from './entities/hero.entity';
import { User } from '../users/entities/user.entity';

@ApiTags('Heroes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }

  @Get('test')
  test() {
    return {} as User;
  }

  @Get()
  async findAll(): Promise<Hero[]> {
    return await this.heroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(+id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.remove(+id);
  }
}
