import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsMongoId, IsNumber, IsPositive } from "class-validator";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
  user_id: z.string().min(24),
  room_id: z.string().min(24),
  check_in_date: z.coerce.date(),
  check_out_date: z.coerce.date(),
  total_price: z.number().positive(),
});

export class CreateBookingDto extends createZodDto(schema) {}

export class CreateBookingDto2 {
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
