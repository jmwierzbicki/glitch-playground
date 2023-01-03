import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ModifierDto } from '../../modifiers/modifier.dto';

export type TalentDocument = Talent & Document;

@Schema()
export class Talent extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  modifiers: ModifierDto[];
}

export const TalentSchema = SchemaFactory.createForClass(Talent);
