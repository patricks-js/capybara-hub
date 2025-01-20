import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(4).max(40),
  description: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
  phone_number: z.string().optional(),
});

export class CreateHotelDto extends createZodDto(schema) {}

export class CreateHotelDto2 {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  description?: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  state: string;

  @IsString()
  @ApiProperty()
  zip_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone_number?: string;
}
