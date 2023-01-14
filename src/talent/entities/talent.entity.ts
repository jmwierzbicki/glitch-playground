import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ModifierDto } from '../../modifiers/modifier.dto';

export type TalentDocument = Talent & Document;

@Schema()
export class Talent extends Document {
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  multiple: boolean;

  @Prop()
  subName: string;

  @Prop()
  modifiers: ModifierDto[];
}

export const TalentSchema = SchemaFactory.createForClass(Talent);
