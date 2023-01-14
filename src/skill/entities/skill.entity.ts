import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SubskillDto } from '../dto/subskill.dto';


export type SkillDocument = Skill & Document;

@Schema()
export class Skill extends Document {
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  isCategory: boolean;

  @Prop()
  subSkillName: string[];

  @Prop()
  subSkill: SubskillDto[];

  @Prop()
  advanced: boolean;

  @Prop()
  attribute: string;

  @Prop()
  description: string;

  @Prop()
  relatedTalents: string[];
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
