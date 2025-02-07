import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class CreatePromotionDto {
  @ApiProperty({
    description: "Promotion title",
    example: "Summer Special",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Promotion description",
    example: "Enjoy a 20% discount on your stay during summer!",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Discount percentage",
    example: "20.00",
  })
  @IsDecimal()
  @IsNotEmpty()
  discountPercentage: string;

  @ApiProperty({
    description: "Start date of the promotion",
    example: "2025-06-01",
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: "End date of the promotion",
    example: "2025-08-31",
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}
