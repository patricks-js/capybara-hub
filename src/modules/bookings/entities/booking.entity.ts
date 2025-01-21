import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { type HydratedDocument, SchemaTypes } from "mongoose";

export enum BookingStatus {
  PENDING = "Pending",
  REJECTED = "Rejected",
  ACCEPTED = "Accepted",
  FINISHED = "Finished",
  CANCELLED = "Cancelled",
}

@Schema({ collection: "bookings", timestamps: true, versionKey: false })
export class Booking {
  @Prop({ type: SchemaTypes.ObjectId, ref: "User", required: true })
  @ApiProperty()
  user_id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Room", required: true })
  @ApiProperty()
  room_id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Hotel", required: true })
  @ApiProperty()
  hotel_id: string;

  @Prop({ required: true })
  @ApiProperty()
  check_in_date: Date;

  @Prop({ required: true })
  @ApiProperty()
  check_out_date: Date;

  @Prop({ required: true })
  @ApiProperty()
  total_price: number;

  @Prop({ enum: BookingStatus, required: true, default: BookingStatus.PENDING })
  @ApiProperty()
  status: BookingStatus;
}

export type BookingDocument = HydratedDocument<Booking>;
export const BookingSchema = SchemaFactory.createForClass(Booking);
