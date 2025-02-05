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
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { Booking } from "./entities/booking.entity";

@ApiTags("bookings")
@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Booking,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiBody({ type: CreateBookingDto })
  create(@Body() createBookingDto: CreateBookingDto) {}

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
  @ApiBody({ type: UpdateBookingDto })
  update(@Param("id") id: string, @Body() updateBookingDto: UpdateBookingDto) {}

  @Delete(":id")
  @ApiOkResponse({ description: "Delete booking successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found bookings" })
  remove(@Param("id") id: string) {}
}
