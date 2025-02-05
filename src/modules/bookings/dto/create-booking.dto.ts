import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";

import { BookingStatus } from "../entities/booking.entity";

export class CreateBookingDTO {
  @IsMongoId()
  @IsNotEmpty()
  customerId: string;

  @IsMongoId()
  @IsNotEmpty()
  hotelId: string;

  @IsMongoId()
  @IsNotEmpty()
  roomId: string;

  @IsDateString()
  @IsNotEmpty()
  checkInDate: string;

  @IsDateString()
  @IsNotEmpty()
  checkoutDate: string;

  @IsDecimal()
  @IsNotEmpty()
  totalPrice: string;

  @IsEnum(BookingStatus)
  @IsNotEmpty()
  status: string;
}
