import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateHotelDto } from "../hotels/dto/create-hotel.dto";
import { UpdateHotelDto } from "../hotels/dto/update-hotel.dto";
import { Hotel } from "../hotels/entity/hotel.entity";

@ApiTags("hotel")
@Controller("hotel")
@ApiBearerAuth()
export class HotelController {
  @Post()
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Hotel,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiBody({ type: CreateHotelDto })
  create(@Body() createHotelDto: CreateHotelDto) {}

  @Get()
  @ApiOkResponse({ description: "Get All hotel successfully", type: [Hotel] })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found hotel" })
  findAll() {}

  @Get(":id")
  @ApiOkResponse({ description: "Get hotel by id successfully", type: Hotel })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found hotel" })
  findOne(@Param("id") id: string) {}

  @Patch(":id")
  @ApiOkResponse({ description: "Update hotel successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found hotel" })
  @ApiBody({ type: UpdateHotelDto })
  update(@Param("id") id: string, @Body() updateHotelDto: UpdateHotelDto) {}

  @Delete(":id")
  @ApiOkResponse({ description: "Delete hotel successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found hotel" })
  remove(@Param("id") id: string) {}
}
