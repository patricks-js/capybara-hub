import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
} from "class-validator";
import { CreateHotelAddressDto } from "./create-hotel-address.dto";

export class CreateHotelDto {
  @ApiProperty({
    description: "Hotel name",
    example: "Grand Capybara Hotel",
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: "Hotel business email",
    example: "contact@capybarahub.com",
  })
  @IsEmail(
    { host_whitelist: ["capybarahub.com"] },
    { message: "The provided email is not a capybarahub email" },
  )
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: "Hotel contact phone number",
    example: "+5511999999999",
  })
  @IsPhoneNumber("BR")
  @IsNotEmpty()
  readonly phone: string;

  @ApiPropertyOptional({ description: "Hotel address details" })
  @IsNotEmpty()
  @IsObject()
  readonly address?: CreateHotelAddressDto;

  @ApiProperty({
    description: "Hotel image",
    example: "https://capybarahub.com/images/hotel-image.jpg",
  })
  @IsString()
  @IsNotEmpty()
  readonly image: string;
}
