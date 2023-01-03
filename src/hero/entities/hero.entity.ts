import { User } from '../../users/entities/user.entity';
import { Profession } from '../../profession/entities/profession.entity';
import { Item } from '../../item/entities/item.entity';
import { Skill } from '../../skill/entities/skill.entity';
import { Talent } from '../../talent/entities/talent.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseStatsDto } from '../dto/base-stats.dto';
import { BioDataDto } from '../dto/bio-data.dto';
import { Campaign } from '../../campaigns/entities/campaign.entity';

export type HeroDocument = Hero & Document;
@Schema()
export class Hero extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: Types.ObjectId | User;

  @Prop({ type: Types.ObjectId, ref: User.name })
  gameMaster: Types.ObjectId | User;

  @Prop({ type: Types.ObjectId, ref: Campaign.name })
  campaign: Types.ObjectId | Campaign;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  bio: BioDataDto;

  @Prop()
  baseStats: BaseStatsDto;

  @Prop({ type: Types.ObjectId, ref: Profession.name })
  currentProfession: Types.ObjectId | Profession;

  @Prop({ type: Types.ObjectId, ref: Profession.name })
  nextProfession: Types.ObjectId | Profession;

  @Prop({ type: Types.ObjectId, ref: Profession.name })
  professionHistory: Types.ObjectId | Profession;

  @Prop({ type: Types.ObjectId, ref: Item.name })
  inventory: Item[];

  @Prop()
  gold: number;

  @Prop()
  silver: number;

  @Prop()
  copper: number;

  @Prop()
  skills: Skill[];

  @Prop()
  talents: Talent[];

  @Prop()
  notes: string;

  @Prop()
  statsDevelopment: BaseStatsDto;

  @Prop()
  optionalAdvancementRule: boolean;
}
