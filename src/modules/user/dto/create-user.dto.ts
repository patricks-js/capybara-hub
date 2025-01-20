import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(4).max(40),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
});

export class CreateUserDto extends createZodDto(schema) {}

export class CredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;
}
