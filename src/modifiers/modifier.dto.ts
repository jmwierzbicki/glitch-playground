import { ApiProperty } from '@nestjs/swagger';

enum modifierTypeEnum {
  'PERM_STAT_BOOST' = 'permStatBoost',
  'TEST_MODIFIER' = 'testModifier',
}

export class ModifierDto {
  name: string;
  target: string;
  value: number;
  @ApiProperty({
    enum: modifierTypeEnum,
    isArray: false,
  })
  type: modifierTypeEnum;
  optional: boolean;
}
