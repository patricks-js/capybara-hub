import { Address } from "@/modules/addresses/entities/address.entity";
import { IsObject, IsPhoneNumber } from "class-validator";

export class UpdateHotelDTO {
  @IsPhoneNumber("BR")
  readonly phone?: string;

  @IsObject()
  readonly address?: Address;
}
