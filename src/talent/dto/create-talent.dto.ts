import { Prop } from '@nestjs/mongoose';
import { ModifierDto } from '../../modifiers/modifier.dto';

export class CreateTalentDto {

  name: string;

  description: string;

  modifiers: ModifierDto[];
}
