import { IsPhoneNumber, IsString } from "class-validator";

export class UpdateCustomerDTO {
  @IsString()
  readonly name?: string;

  @IsPhoneNumber("BR")
  readonly phone?: string;
}
