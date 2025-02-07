import { CurrentUserId } from "@/common/decorators/current-user-id";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { CustomersService } from "./customers.service";
import { UpdateCustomerAddressDto } from "./dto/update-customer-address.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@ApiTags("customers")
@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get("me")
  @ApiOperation({ summary: "Get customer profile" })
  @ApiOkResponse({ description: "Get customer profile successfully" })
  @ApiUnauthorizedResponse({ description: "You are not logged in" })
  getCustomerOwnProfile(@CurrentUserId() id: string) {
    return this.customersService.getCustomerOwnProfile(id);
  }

  @Put("me")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Update profile" })
  @ApiOkResponse({ description: "Update profile successfully" })
  @ApiUnauthorizedResponse({ description: "You are not logged in" })
  updateCurrentProfile(
    @CurrentUserId() id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.updateCurrentProfile(id, updateCustomerDto);
  }

  @Delete("me")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete profile" })
  @ApiOkResponse({ description: "Delete profile successfully" })
  @ApiUnauthorizedResponse({ description: "You are not logged in" })
  deleteProfile(@CurrentUserId() id: string) {
    return this.customersService.deleteCurrentCustomerProfile(id);
  }

  @Put("address")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Add customer address" })
  @ApiOkResponse({ description: "Add customer address successfully" })
  @ApiUnauthorizedResponse({ description: "You are not logged in" })
  updateCurrentCustomerAddress(
    @CurrentUserId() id: string,
    @Body() updateCustomerAddressDto: UpdateCustomerAddressDto,
  ) {
    return this.customersService.updateCurrentCustomerAddress(
      id,
      updateCustomerAddressDto,
    );
  }
}
