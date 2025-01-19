import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsMongoId, IsNumber, IsString } from "class-validator";

export class CreatePromotionDto {
  @IsMongoId()
  @ApiProperty()
  booking_id: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  discount_percentage: number;

  @IsDateString()
  @ApiProperty()
  start_date: string;

  @IsDateString()
  @ApiProperty()
  end_date: string;
}
