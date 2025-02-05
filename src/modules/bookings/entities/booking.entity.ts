import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type HydratedDocument, Types } from "mongoose";

import { Customer } from "@/modules/customers/entities/customer.entity";
import { Hotel } from "@/modules/hotels/entity/hotel.entity";
import { Room } from "@/modules/rooms/entities/room.entity";
import { Promotion, PromotionSchema } from "./promotion.entity";

export enum BookingStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

@Schema({ collection: "bookings", timestamps: true, versionKey: false })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Hotel.name, required: true })
  hotel: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Room.name, required: true })
  room: Types.ObjectId;

  @Prop({ required: true })
  checkInDate: Date;

  @Prop({ required: true })
  checkoutDate: Date;

  @Prop({ enum: BookingStatus, required: true })
  status: string;

  @Prop({ type: Types.Decimal128, required: true })
  totalPrice: Types.Decimal128;

  @Prop({ type: PromotionSchema })
  promotion: Promotion;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
export type BookingDocumentOverride = {
  promotion: Types.Subdocument<Promotion>;
};
export type BookingDocument = HydratedDocument<
  Booking,
  BookingDocumentOverride
>;
