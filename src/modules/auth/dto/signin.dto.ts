import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
