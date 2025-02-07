import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class SignupDto {
  @ApiProperty({
    description: "Customer full name",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: "Customer email address",
    example: "john.doe@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description:
      "Customer password - minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character",
    example: "Password123@",
  })
  @IsStrongPassword()
  @IsNotEmpty()
  readonly password: string;

  @ApiPropertyOptional({
    description: "Customer BR phone number",
    example: "+5511999999999",
  })
  @IsString()
  @IsPhoneNumber("BR")
  readonly phone: string;
}
