import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: "room_types", versionKey: false })
export class RoomType {
  @Prop({ required: true, unique: true })
  type: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  capacity: number;
}

export const RoomTypeSchema = SchemaFactory.createForClass(RoomType);
export type RoomTypeDocument = HydratedDocument<RoomType>;
