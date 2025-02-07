import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPostalCode, IsString } from "class-validator";

export class CreateHotelAddressDto {
  @ApiProperty({
    description: "Street name",
    example: "Avenida Paulista",
  })
  @IsString({ message: "This is not a valid street" })
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    description: "Street number",
    example: 1000,
  })
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @ApiProperty({
    description: "Postal code",
    example: "01310-100",
  })
  @IsPostalCode("BR")
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({
    description: "State",
    example: "SP",
  })
  @IsString({ message: "This is not a valid state" })
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: "City",
    example: "São Paulo",
  })
  @IsString({ message: "This is not a valid city" })
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: "Country",
    example: "Brasil",
  })
  @IsString({ message: "This is not a valid country" })
  @IsNotEmpty()
  country: string;
}
