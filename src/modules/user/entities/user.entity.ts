import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  ADMIN = "Admin",
  CUSTOMER = "Customer",
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

@Schema({ collection: "users" })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop({ enum: UserRole, required: true })
  role: UserRole;

  @Prop({ type: [Object] })
  addresses: Address[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
