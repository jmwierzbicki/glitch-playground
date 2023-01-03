import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum RoleEnum {
  User = 'User',
  GM = 'GM',
  Admin = 'Admin',
}

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  email: string;

  @ApiProperty({
    enum: RoleEnum,
    type: String,
    isArray: false,
  })
  @Prop({ type: String, enum: RoleEnum, default: RoleEnum.User })
  role: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  discordUser: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
