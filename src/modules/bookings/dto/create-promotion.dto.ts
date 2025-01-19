import { IsDateString, IsMongoId, IsNumber, IsString } from "class-validator";

export class CreatePromotionDto {
  @IsMongoId()
  booking_id: string;

  @IsString()
  description: string;

  @IsNumber()
  discount_percentage: number;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;
}
