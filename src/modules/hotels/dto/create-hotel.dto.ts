import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
} from "class-validator";
import { CreateHotelAddressDto } from "./create-hotel-address.dto";

export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail(
    { host_whitelist: ["capybarahub.com"] },
    { message: "The provided email is not a capybarahub email" },
  )
  @IsNotEmpty()
  readonly email: string;

  @IsPhoneNumber("BR")
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  @IsObject()
  readonly address?: CreateHotelAddressDto;
}
