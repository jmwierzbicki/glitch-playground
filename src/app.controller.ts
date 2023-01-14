import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AttachmentBuilder,
  BaseGuildTextChannel,
  EmbedBuilder,
  // GatewayIntentBits,
} from 'discord.js';
import { BotService } from './bot-service/bot.service';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { Public } from './auth/jwt-auth.guard';
import { ResponseBuilder } from './bot-service/response-builder';
import { ApiBearerAuth } from '@nestjs/swagger';
import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { ExportedEnums } from './enums/exported-enums.dto';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private botService: BotService,
  ) {}

  // @Public()
  // @Get()
  // async getHello(): Promise<Cat[]> {
  //   // const createCatDto: CreateCatDto = {
  //   //   age: 9,
  //   //   name: 'Koteł',
  //   //   breed: 'Europejski',
  //   // };
  //   //
  //   // const createdCat = new this.catModel(createCatDto);
  //   // await createdCat.save();
  //
  //   console.log('request!');
  //   return this.catModel.find().exec();
  // }

  @Public()
  @Get()
  async helloWorld() {
    console.log('hello!');
    return 'hello';
  }

  @Get('enums')
  exportedEnums(@Body() exportedEnums: ExportedEnums): number {
    return 0;
  }

  @Get('test-bot')
  async testBot() {
    console.log(this.botService.client.isReady());
    // console.log(this.botService.client)

    const channelId = '547839876784062507';
    const channel = (await this.botService.client.channels.cache.get(
      channelId,
    )) as BaseGuildTextChannel;
    // console.log(JSON.stringify(channel));

    // console.log(this.botService.connection);;
    // this.botService.connection.destroy();
    // console.log(this.botService.client.isReady());;

    return channel;
  }

  @Get('update-commands')
  updateCommands() {
    this.botService.registerCommands();
  }

  @Public()
  @Post('interactions')
  interactions(@Req() req) {
    if (req.body.type === InteractionType.PING) {
      return {
        type: InteractionResponseType.PONG,
      };
    }
    console.log(req.body.type);
    console.log(req.body.data);

    const res = new ResponseBuilder(
      InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    )
      .setContent('+1')
      .addButton('test1', 'CusTom IDDD')
      .setEphemeral();

    return res;
  }

  @Get('send')
  async sendMessage() {
    const embed = new EmbedBuilder()
      .setTitle('Some Title')
      .addFields([
        {
          name: 'Regular field title',
          value: 'Some value here',
        },
        { name: 'Regular field title', value: 'another value here' },
      ])
      .setColor(0x00ffff);

    const channelID = '547839876784062507';
    const webhook = await this.botService.findOrCreateWebhookForChannel(
      channelID,
      {
        name: 'Jack DEsparrow',
      },
    );
    const webhookClient = this.botService.getWebhookClient(webhook);

    const canvas = createCanvas(700, 250);
    const context = canvas.getContext('2d');
    const image = fs.readFileSync(__dirname + '/../wallpaper.png');
    const background = await loadImage(image);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Use the helpful Attachment class structure to process the file for you
    const attachment = await new AttachmentBuilder(await canvas.encode('png'), {
      name: 'wallpaper.png',
    });

    await webhookClient.send({
      content: 'Webhook test',
      embeds: [embed],
      files: [attachment],
    });

    console.log(webhook);
  }
}
