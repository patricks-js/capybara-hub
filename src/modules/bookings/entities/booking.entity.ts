import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type HydratedDocument, SchemaTypes } from "mongoose";

export enum BookingStatus {
  PENDING = "Pending",
  REJECTED = "Rejected",
  ACCEPTED = "Accepted",
  FINISHED = "Finished",
  CANCELLED = "Cancelled",
}

@Schema({ collection: "bookings", timestamps: true })
export class Booking {
  @Prop({ type: SchemaTypes.ObjectId, ref: "User", required: true })
  user_id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Room", required: true })
  room_id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Hotel", required: true })
  hotel_id: string;

  @Prop({ required: true })
  check_in_date: Date;

  @Prop({ required: true })
  check_out_date: Date;

  @Prop({ required: true })
  total_price: number;

  @Prop({ enum: BookingStatus, required: true, default: BookingStatus.PENDING })
  status: BookingStatus;
}

export type BookingDocument = HydratedDocument<Booking>;
export const BookingSchema = SchemaFactory.createForClass(Booking);
