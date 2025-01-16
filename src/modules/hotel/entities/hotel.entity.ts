import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type HotelDocument = HydratedDocument<Hotel>;

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  coordinates?: Coordinates;
}

@Schema({ collection: "hotels" })
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [Object], required: true })
  addresses: Address[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
