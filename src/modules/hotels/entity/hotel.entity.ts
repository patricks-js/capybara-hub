import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import {
  Address,
  AddressSchema,
} from "@/modules/addresses/entities/address.entity";

@Schema({ collection: "hotels", timestamps: true, versionKey: false })
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, type: AddressSchema })
  address: Address;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
export type HotelDocument = HydratedDocument<Hotel>;
