import { Hotel } from "@/modules/hotels/entity/hotel.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { RoomType } from "./room-type.entity";

export enum RoomStatus {
  AVAILABLE = "available",
  OCCUPIED = "occupied",
  MAINTENANCE = "maintenance",
}

@Schema({ collection: "rooms", versionKey: false })
export class Room {
  @Prop({ required: true, type: Types.ObjectId, ref: Hotel.name })
  hotel: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: RoomType.name })
  roomType: Types.ObjectId;

  @Prop({ required: true, type: Types.Decimal128 })
  pricePerNight: Types.Decimal128;

  @Prop({ required: true })
  roomNumber: number;

  @Prop({ required: true, enum: RoomStatus })
  status: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
export type RoomDocumentOverride = { roomType: Types.Subdocument<RoomType> };
export type RoomDocument = HydratedDocument<Room, RoomDocumentOverride>;

RoomSchema.index({ hotel: 1, roomType: 1, roomNumber: 1 }, { unique: true });
