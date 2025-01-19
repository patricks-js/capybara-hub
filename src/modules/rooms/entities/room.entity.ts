import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type HydratedDocument, SchemaTypes } from "mongoose";

export enum RoomType {
  SINGLE = "Single 1 bad",
  DOUBLE = "Double 2 bads",
  TRIPLE = "Triple 3 bads",
  SUITE = "Suite 1 bad for two peoples",
  SUITE_FAMILY = "Suite 1 bad for 2 peoples and a little kid",
}

@Schema({ collection: "rooms", timestamps: true })
export class Room {
  @Prop({ type: SchemaTypes.ObjectId, ref: "Hotel", required: true })
  hotel_id: string;

  @Prop({ enum: RoomType, required: true })
  room_type: RoomType;

  @Prop({ required: true })
  room_number: string;

  @Prop({ required: true })
  price_per_night: number;

  @Prop({ required: true, default: true })
  is_available: boolean;
}

export type RoomDocument = HydratedDocument<Room>;
export const RoomSchema = SchemaFactory.createForClass(Room);
