import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from "@nestjs/common";

import { CustomersService } from "./customers.service";
import { UpdateCustomerDTO } from "./dto/update-customer.dto";

@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Put(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  updateProfile(
    @Param("id") id: string,
    @Body() updateCustomerDTO: UpdateCustomerDTO,
  ) {
    return this.customersService.updateProfile(id, updateCustomerDTO);
  }
}
