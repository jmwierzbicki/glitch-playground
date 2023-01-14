import { ApiProperty } from '@nestjs/swagger';
import {
  AttributeNamesDto,
  SecondaryAttributeNamesDto,
} from '../../enums/attribute-names.dto';

type AttributeNamesInterface = {
  [key in AttributeNamesDto]: number;
};

type SecondaryAttributeNamesInterface = {
  [key in SecondaryAttributeNamesDto]: number;
};

export interface IBaseStatsDto
  extends AttributeNamesInterface,
    SecondaryAttributeNamesInterface {}

export class BaseStatsDto implements IBaseStatsDto {
  WS: number;
  BS: number;
  S: number;
  T: number;
  AG: number;
  INT: number;
  WP: number;
  FEL: number;

  A: number;
  W: number;
  M: number;
  SB: number;
  TB: number;
  MAG: number;
  IP: number;
  FP: number;
}