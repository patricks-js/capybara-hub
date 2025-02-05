import { IsObject, IsPhoneNumber, IsString } from "class-validator";
import { UpdateCustomerAddressDto } from "./update-customer-address.dto";

export class UpdateCustomerDto {
  @IsString()
  readonly name?: string;

  @IsPhoneNumber("BR")
  readonly phone?: string;

  @IsObject()
  readonly address?: UpdateCustomerAddressDto;
}
