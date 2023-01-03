import { Injectable } from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { Profession, ProfessionDocument } from './entities/profession.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfessionService {
  constructor(
    @InjectModel(Profession.name)
    private professionModel: Model<ProfessionDocument>,
  ) {}

  create(createProfessionDto: CreateProfessionDto): Promise<Profession> {
    const createdProfession = new this.professionModel(createProfessionDto);
    return createdProfession.save();
  }

  async findAll(): Promise<Profession[]> {
    return this.professionModel.find({});
  }

  async findOne(id: number): Promise<Profession> {
    return this.professionModel.findById(id);
  }

  async update(
    id: string,
    updateProfessionDto: UpdateProfessionDto,
  ): Promise<Profession> {
    return this.professionModel.findByIdAndUpdate(id, updateProfessionDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.professionModel.findByIdAndDelete(id);
  }
}
