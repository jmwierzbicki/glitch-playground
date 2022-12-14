import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot-service/bot.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './bot-service/discord.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HeroModule } from './hero/hero.module';
import { ProfessionModule } from './profession/profession.module';
import { ItemModule } from './item/item.module';
import { SkillModule } from './skill/skill.module';
import { TalentModule } from './talent/talent.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { GlobalModule } from './global/global.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: process.env.MONGODB_CONNECTION_STRING,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [],
    }),
    UsersModule,
    AuthModule,
    HeroModule,
    ProfessionModule,
    ItemModule,
    SkillModule,
    TalentModule,
    CampaignsModule,

  ],
  controllers: [AppController],
  providers: [AppService, BotService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('interactions');
  }
}
