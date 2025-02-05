import { IsNotEmpty, IsNumber, IsPostalCode, IsString } from "class-validator";

export class CreateHotelAddressDTO {
  @IsString({ message: "This is not a valid street" })
  @IsNotEmpty()
  street: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsPostalCode("BR")
  @IsNotEmpty()
  postalCode: string;

  @IsString({ message: "This is not a valid state" })
  @IsNotEmpty()
  state: string;

  @IsString({ message: "This is not a valid city" })
  @IsNotEmpty()
  city: string;

  @IsString({ message: "This is not a valid country" })
  @IsNotEmpty()
  country: string;
}
