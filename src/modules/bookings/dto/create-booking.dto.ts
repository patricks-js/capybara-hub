import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsMongoId, IsNumber, IsPositive } from "class-validator";

export class CreateBookingDto {
  @IsMongoId()
  @ApiProperty()
  user_id: string;

  @IsMongoId()
  @ApiProperty()
  room_id: string;

  @IsDateString()
  @ApiProperty()
  check_in_date: string;

  @IsDateString()
  @ApiProperty()
  check_out_date: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  total_price: number;
}
