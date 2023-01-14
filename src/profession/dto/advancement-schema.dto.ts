import { BaseStatsDto } from '../../hero/dto/base-stats.dto';

type AdvancementSchemaType = Omit<BaseStatsDto, 'SB' | 'TB' | 'IP' | 'FP'>;

export class AdvancementSchemaDto implements AdvancementSchemaType {
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
  MAG: number;
}
