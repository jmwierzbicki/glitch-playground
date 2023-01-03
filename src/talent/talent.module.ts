import { Module } from '@nestjs/common';
import { TalentService } from './talent.service';
import { TalentController } from './talent.controller';
import { Talent, TalentSchema } from './entities/talent.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [TalentController],
  providers: [TalentService],
  imports: [
    MongooseModule.forFeature([
      { name: Talent.name, schema: TalentSchema }
    ])
  ],
})
export class TalentModule {}
