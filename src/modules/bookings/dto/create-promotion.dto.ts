import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsMongoId, IsNumber, IsString } from "class-validator";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
  booking_id: z.string().min(24),
  description: z.string(),
  discount_percentage: z.number().positive(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
});

export class CreatePromotionDto extends createZodDto(schema) {}

export class CreatePromotionDto2 {
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
