import { User } from '../../users/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseStatsDto } from '../../hero/dto/base-stats.dto';
import { Skill } from '../../skill/entities/skill.entity';
import { Talent } from '../../talent/entities/talent.entity';

export type ProfessionDocument = Profession & Document;

@Schema()
export class Profession extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  statsDevelopment: BaseStatsDto;

  @Prop({ type: [Types.ObjectId], ref: Skill.name })
  skills: Skill[];

  @Prop({ type: [Types.ObjectId], ref: Talent.name })
  talents: Talent[];

  @Prop()
  equipment: string;

  @Prop({ type: [Types.ObjectId], ref: Profession.name })
  entryProfessions: Profession[];

  @Prop({ type: [Types.ObjectId], ref: Profession.name })
  exitProfessions: Profession[];


}

export const ProfessionSchema = SchemaFactory.createForClass(Profession);
