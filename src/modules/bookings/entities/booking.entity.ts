import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type BookingDocument = HydratedDocument<Booking>;

export enum BookingStatus {
  PENDING = "Pending",
  REJECTED = "Rejected",
  ACCEPTED = "Accepted",
  FINISHED = "Finished",
  CANCELLED = "Cancelled",
}

@Schema({ collection: "bookings" })
export class Booking {
  @Prop({ type: SchemaTypes.ObjectId, ref: "User", required: true })
  userId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Hotel", required: true })
  hotelId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Room", required: true })
  roomId: string;

  @Prop({ required: true })
  checkIn: Date;

  @Prop({ required: true })
  checkOut: Date;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ enum: BookingStatus, required: true, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
