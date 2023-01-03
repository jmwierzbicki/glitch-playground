import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  UseGuards, ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AppGateway } from '../gateway/app-gateway.service';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, isString } from 'class-validator';

class PlayVideoParams {
  @ApiModelProperty()
  @Type(() => String)
  videoId: string;

  @ApiModelProperty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  loop: boolean;

  @ApiModelPropertyOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  startSeconds?: number;

  @ApiModelPropertyOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  endSeconds?: number;
}

@ApiTags('Music bot')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('music-bot')
export class MusicBotController {
  constructor(public gateway: AppGateway) {}

  @Get()
  public ping(
    @Query(new ValidationPipe({ transform: true })) qp: PlayVideoParams
    // @Query() playVideoParams: PlayVideoParams
    // @Query('videoId') videoId: string,
    // @Query('loop', new DefaultValuePipe(false), ParseBoolPipe) loop: boolean,
    // @Query('startSeconds', new DefaultValuePipe(0), ParseIntPipe)
    // startSeconds?: number,
    // @Query('endSeconds', ParseIntPipe)
    // endSeconds?: number,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const loopBool = playVideoParams.loop === `true`;
    this.gateway.server.emit('music', {
      videoId: qp.videoId,
      loop: qp.loop,
      startSeconds: qp.startSeconds,
      endSeconds: qp.endSeconds,
    });
    return '';
  }
}
