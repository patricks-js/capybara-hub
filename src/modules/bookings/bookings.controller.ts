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
import { BookingsService } from "./bookings.service";
import { CreateBookingDTO } from "./dto/create-booking.dto";
import { UpdateBookingDTO } from "./dto/update-booking.dto";
import { Booking } from "./entities/booking.entity";

@ApiTags("bookings")
@Controller("bookings")
@ApiBearerAuth()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Booking,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiBody({ type: CreateBookingDTO })
  create(@Body() createBookingDTO: CreateBookingDTO) {}

  @Get()
  @ApiOkResponse({
    description: "Get All bookings successfully",
    type: [Booking],
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found bookings" })
  findAll() {}

  @Get(":id")
  @ApiOkResponse({
    type: Booking,
    description: "Get booking by id successfully",
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found bookings" })
  findOne(@Param("id") id: string) {}

  @Patch(":id")
  @ApiOkResponse({ description: "Update booking successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found bookings" })
  @ApiBody({ type: UpdateBookingDTO })
  update(@Param("id") id: string, @Body() updateBookingDto: UpdateBookingDTO) {}

  @Delete(":id")
  @ApiOkResponse({ description: "Delete booking successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found bookings" })
  remove(@Param("id") id: string) {}
}
