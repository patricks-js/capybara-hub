import { PartialType } from "@nestjs/mapped-types";
import { CreateCustomerAddressDTO } from "./create-customer-address.dto";

export class UpdateCustomerAddressDTO extends PartialType(
  CreateCustomerAddressDTO,
) {}
