import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
  @ApiProperty({
    description: "Customer email address",
    example: "john.doe@gmail.com",
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: "Customer password",
    example: "Password123@",
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
