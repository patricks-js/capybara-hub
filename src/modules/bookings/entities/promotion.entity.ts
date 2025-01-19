import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { type HydratedDocument, SchemaTypes } from "mongoose";

@Schema({ collection: "promotions", timestamps: true })
export class Promotion {
  @Prop({ type: SchemaTypes.ObjectId, ref: "Booking", required: true })
  @ApiProperty()
  booking_id: string;

  @Prop({ required: true })
  @ApiProperty()
  description: string;

  @Prop({ required: true })
  @ApiProperty()
  discount_percentage: number;

  @Prop({ required: true })
  @ApiProperty()
  start_date: Date;

  @Prop({ required: true })
  @ApiProperty()
  end_date: Date;
}

export type PromotionDocument = HydratedDocument<Promotion>;
export const PromotionSchema = SchemaFactory.createForClass(Promotion);
