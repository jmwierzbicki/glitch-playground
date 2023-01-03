import { Module } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { ProfessionController } from './profession.controller';
import { Profession, ProfessionSchema } from './entities/profession.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ProfessionController],
  providers: [ProfessionService],
  imports: [
    MongooseModule.forFeature([
      { name: Profession.name, schema: ProfessionSchema },
    ]),
  ],
})
export class ProfessionModule {}
