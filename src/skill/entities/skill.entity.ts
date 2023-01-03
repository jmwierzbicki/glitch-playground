import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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
  advanced: boolean;

  @Prop()
  attribute: string;

  @Prop()
  description: string;

  @Prop()
  relatedTalents: string[];
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
