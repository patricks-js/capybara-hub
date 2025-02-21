import { CurrentUserId } from "@/common/decorators/current-user-id";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { Booking, BookingStatus } from "./entities/booking.entity";

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
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }

  @Get()
  @ApiOkResponse({
    description: "Get All customer bookings successfully",
    type: [Booking],
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiNotFoundResponse({ description: "Not found bookings" })
  findAll(
    @CurrentUserId() customerId: string,
    @Query("status") status: BookingStatus,
  ) {
    if (status) {
      return this.bookingsService.getCustomerBookingsByStatus(
        customerId,
        status,
      );
    }

    return this.bookingsService.getAllCustomerBookings(customerId);
  }

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
  @ApiOkResponse({ description: "Booking cancellation successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Booking not found" })
  cancelBooking(@Param("id") id: string) {
    return this.bookingsService.cancelBooking(id);
  }
}
