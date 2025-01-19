import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import type { HydratedDocument } from "mongoose";

@Schema({ collection: "hotels", timestamps: true })
export class Hotel {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: true })
  @ApiProperty()
  description: string;

  @Prop({ required: true })
  @ApiProperty()
  address: string;

  @Prop({ required: true })
  @ApiProperty()
  city: string;

  @Prop({ required: true })
  @ApiProperty()
  state: string;

  @Prop({ required: true })
  @ApiProperty()
  zip_code: string;

  @Prop()
  @ApiProperty()
  phone_number: string;
}

export type HotelDocument = HydratedDocument<Hotel>;
export const HotelSchema = SchemaFactory.createForClass(Hotel);
