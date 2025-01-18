import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type RoomDocument = HydratedDocument<Room>;

export enum RoomType {
  SINGLE = "Single 1 bad",
  DOUBLE = "Double 2 bads",
  TRIPLE = "Triple 3 bads",
  SUITE = "Suite 1 bad for two peoples",
  SUITE_FAMILY = "Suite 1 bad for 2 peoples and a little kid",
}

@Schema({ collection: "rooms" })
export class Room {
  @Prop({ type: SchemaTypes.ObjectId, ref: "Hotel" })
  _id: string;

  @Prop({ enum: RoomType, required: true })
  roomType: RoomType;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  pricePerNight: number;

  @Prop({ required: true })
  amenities: string[];

  @Prop({ default: true })
  availability: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
