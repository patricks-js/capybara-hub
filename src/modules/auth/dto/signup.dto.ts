import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class SignupDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: "john.doe@gmail.com" })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: "81991222493" })
  @IsPhoneNumber("BR")
  readonly phone: string;
}
