import { IsObject, IsPhoneNumber, IsString } from "class-validator";
import { UpdateCustomerAddressDTO } from "./update-customer-address.dto";

export class UpdateCustomerDTO {
  @IsString()
  readonly name?: string;

  @IsPhoneNumber("BR")
  readonly phone?: string;

  @IsObject()
  readonly address?: UpdateCustomerAddressDTO;
}
