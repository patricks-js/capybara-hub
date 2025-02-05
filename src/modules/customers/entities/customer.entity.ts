import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import { Address, AddressSchema } from "@/common/schemas/address.schema";

@Schema({ collection: "customers", timestamps: true, versionKey: false })
export class Customer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop({ type: AddressSchema })
  address: Address;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
export type CustomerDocumentOverride = { address: Types.Subdocument<Address> };
export type CustomerDocument = HydratedDocument<
  Customer,
  CustomerDocumentOverride
>;
