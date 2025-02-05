import { IsObject, IsPhoneNumber } from "class-validator";
import { UpdateHotelAddressDto } from "./update-hotel-address.dto";

export class UpdateHotelDto {
  @IsPhoneNumber("BR")
  readonly phone?: string;

  @IsObject()
  readonly address?: UpdateHotelAddressDto;
}
