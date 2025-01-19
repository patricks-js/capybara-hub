import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type HydratedDocument, SchemaTypes } from "mongoose";

@Schema({ collection: "promotions", timestamps: true })
export class Promotion {
  @Prop({ type: SchemaTypes.ObjectId, ref: "Booking", required: true })
  booking_id: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  discount_percentage: number;

  @Prop({ required: true })
  start_date: Date;

  @Prop({ required: true })
  end_date: Date;
}

export type PromotionDocument = HydratedDocument<Promotion>;
export const PromotionSchema = SchemaFactory.createForClass(Promotion);
