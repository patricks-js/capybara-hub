import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class Booking {
  @Prop({
    required: true,
    name: "customer_id",
    type: Types.ObjectId,
    ref: "Customer",
  })
  customerId: string;

  @Prop({
    required: true,
    name: "hotel_id",
    type: Types.ObjectId,
    ref: "Hotel",
  })
  hotelId: string;

  @Prop({
    required: true,
    name: "room_id",
    type: Types.ObjectId,
    ref: "Room",
  })
  roomId: string;

  @Prop({ required: true, name: "check_in_date" })
  checkInDate: Date;

  @Prop({ required: true, name: "checkout_date" })
  checkoutDate: Date;

  @Prop({
    required: true,
    enum: ["pending", "confirmed", "canceled", "completed"],
  })
  status: string;

  @Prop({ required: true, name: "total_price" })
  totalPrice: number;

  @Prop({ required: true, name: "payment_method" })
  paymentMethod: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
export type BookingDocument = HydratedDocument<Booking>;
