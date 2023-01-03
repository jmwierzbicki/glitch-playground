import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { Skill, SkillSchema } from './entities/skill.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [SkillController],
  providers: [SkillService],
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
})
export class SkillModule {}
