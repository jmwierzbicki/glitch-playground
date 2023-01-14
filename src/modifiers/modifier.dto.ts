import { ApiProperty } from '@nestjs/swagger';

enum modifierTypeEnum {
  BASE_STAT_INCREASE = 'baseStatIncrease',
  SECONDARY_STAT_INCREASE = 'secondaryStatIncrease',
  RANGED_DMG_INCREASE = 'rangedDmgIncrease',
  MELEE_DMG_INCREASE = 'meleeDmgIncrease',
  ALL_DMG_INCREASE = 'allDmgIncrease',
  SKILL_TEST_MODIFIER = 'skillTestModifier',
  BASE_STAT_TEST_MODIFIER = 'BaseStatTestModifier',
  SECONDARY_STAT_MODIFIER = 'secondaryStatModifier',
}

export class ModifierDto {
  name: string;
  target: string;
  value: number;
  positive: boolean;
  passive: boolean;
  @ApiProperty({
    enum: modifierTypeEnum,
    isArray: false,
  })
  type: modifierTypeEnum;
  default: boolean;
}
