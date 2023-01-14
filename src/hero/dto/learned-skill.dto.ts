import { Skill } from '../../skill/entities/skill.entity';
import { BaseStatsDto } from './base-stats.dto';

export class LearnedSkillDto {
  refSkill: Skill;
  name: string;
  baseStat: BaseStatsDto
  level: 0 | 1 | 2;
}
