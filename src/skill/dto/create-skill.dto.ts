export class CreateSkillDto {
  name: string;
  description: string;
  isCategory: boolean;
  subSkillName?: string[];
  advanced: boolean;
  attribute: string;
  relatedTalents: string[];
}
