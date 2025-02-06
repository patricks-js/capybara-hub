import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CustomersService } from "./customers.service";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@ApiTags("customers")
@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Put(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: "Update profile successfully" })
  updateProfile(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.updateProfile(id, updateCustomerDto);
  }
}
