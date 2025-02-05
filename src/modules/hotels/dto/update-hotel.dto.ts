import { IsObject, IsPhoneNumber } from "class-validator";
import { UpdateHotelAddressDTO } from "./update-hotel-address.dto";

export class UpdateHotelDTO {
  @IsPhoneNumber("BR")
  readonly phone?: string;

  @IsObject()
  readonly address?: UpdateHotelAddressDTO;
}
