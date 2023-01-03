//   @InjectModel(Talent.name) private talentModel: Model<TalentDocument>,
import { Injectable } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { Talent, TalentDocument } from './entities/talent.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TalentService {
  constructor(
    @InjectModel(Talent.name) private talentModel: Model<TalentDocument>,
  ) {}

  create(createTalentDto: CreateTalentDto): Promise<Talent> {
    const createdTalent = new this.talentModel(createTalentDto);
    return createdTalent.save();
  }

  async findAll(): Promise<Talent[]> {
    return this.talentModel.find({});
  }

  async findOne(id: string): Promise<Talent> {
    return this.talentModel.findById(id);
  }

  async update(id: string, updateTalentDto: UpdateTalentDto): Promise<Talent> {
    return this.talentModel.findByIdAndUpdate(id, updateTalentDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.talentModel.findByIdAndDelete(id).exec();
  }
}
