import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsDecimal,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";

export class CreateBookingDto {
  @ApiProperty({
    description: "Customer ID",
  })
  @IsMongoId()
  @IsNotEmpty()
  customer: string;

  @ApiProperty({
    description: "Hotel ID",
  })
  @IsMongoId()
  @IsNotEmpty()
  hotel: string;

  @ApiProperty({
    description: "Room ID",
  })
  @IsMongoId()
  @IsNotEmpty()
  room: string;

  @ApiProperty({
    description: "Check-in date",
    example: "2025-09-10",
  })
  @IsDateString()
  @IsNotEmpty()
  checkInDate: string;

  @ApiProperty({
    description: "Check-out date",
    example: "2025-09-15",
  })
  @IsDateString()
  @IsNotEmpty()
  checkoutDate: string;

  @ApiProperty({
    description: "Total price",
    example: "1000.00",
  })
  @IsDecimal()
  @IsNotEmpty()
  totalPrice: string;
}
