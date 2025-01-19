import { IsOptional, IsString } from "class-validator";

export class CreateHotelDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zip_code: string;

  @IsString()
  @IsOptional()
  phone_number?: string;
}
