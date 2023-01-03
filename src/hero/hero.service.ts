import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hero } from './entities/hero.entity';
import { UserProvider } from '../global/user.provider';
import { Campaign } from '../campaigns/entities/campaign.entity';
import { Exceptions } from '../global/exceptions';

@Injectable()
export class HeroService {
  constructor(
    @InjectModel(Hero.name) private heroModel: Model<Hero>,
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
    private userProvider: UserProvider,
  ) {}
  async create(createHeroDto: CreateHeroDto): Promise<Hero> {
    const { campaignCode, ...hero } = createHeroDto;
    const campaign = await this.campaignModel.findOne({ code: campaignCode });
    if (!campaign) {
      Exceptions.resourceNotFound('Provided code does not match any campaign.');
    }

    const createdHero = new this.heroModel(hero);
    createdHero.owner = this.userProvider.userId;
    createdHero.gameMaster = campaign.owner;
    createdHero.campaign = campaign._id;
    return createdHero.save();
  }

  async findAll(): Promise<Hero[]> {
    return this.heroModel
      .find()
      .populate(['owner', 'campaign', 'gameMaster'])
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} hero`;
  }

  update(id: number, updateHeroDto: UpdateHeroDto) {
    return `This action updates a #${id} hero`;
  }

  remove(id: number) {
    return `This action removes a #${id} hero`;
  }
}
