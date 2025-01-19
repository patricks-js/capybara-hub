import { IsDateString, IsMongoId, IsNumber, IsPositive } from "class-validator";

export class CreateBookingDto {
  @IsMongoId()
  user_id: string;

  @IsMongoId()
  room_id: string;

  @IsDateString()
  check_in_date: string;

  @IsDateString()
  check_out_date: string;

  @IsNumber()
  @IsPositive()
  total_price: number;
}
