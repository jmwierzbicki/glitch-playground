import {
  AttributeNamesDto, SecondaryAttributeNamesDto
} from './attribute-names.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ExportedEnums {
  @ApiProperty()
  baseStats: AttributeNamesDto;
  secondaryStats: SecondaryAttributeNamesDto;
}
