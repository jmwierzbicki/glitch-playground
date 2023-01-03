//   @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill, SkillDocument } from './entities/skill.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
  ) {}

  create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const createdSkill = new this.skillModel(createSkillDto);
    return createdSkill.save();
  }

  async findAll(): Promise<Skill[]> {
    return this.skillModel.find({});
  }

  async findOne(id: string): Promise<Skill> {
    return this.skillModel.findById(id);
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    return this.skillModel.findByIdAndUpdate(id, updateSkillDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.skillModel.findByIdAndDelete(id).exec();
  }
}
