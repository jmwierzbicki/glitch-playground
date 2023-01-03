import { Module } from '@nestjs/common';
import { AppGateway } from './gateway/app-gateway.service';
import { MusicBotController } from './music-bot/music-bot.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AppGateway],
  controllers: [MusicBotController],
})
export class MusicBotModule {}
