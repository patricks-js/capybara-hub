import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { Model } from "mongoose";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { Booking, BookingStatus } from "./entities/booking.entity";

/**
 * TODO: Implement create booking
 * TODO: Implement cancel booking
 * TODO: Implement get booking by customer
 * TODO: Implement get booking by hotel
 */

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  async createBooking(booking: CreateBookingDto): Promise<Booking> {
    const checkInDate = dayjs(booking.checkInDate);
    const checkoutDate = dayjs(booking.checkoutDate);

    const isCheckInDateBeforeCheckoutDate = checkInDate.isBefore(checkoutDate);
    const isCheckInDateAfterToday = checkInDate.isAfter(dayjs());
    const isCheckoutDateAfterToday = checkoutDate.isAfter(dayjs());

    if (
      !isCheckInDateBeforeCheckoutDate ||
      !isCheckInDateAfterToday ||
      !isCheckoutDateAfterToday
    ) {
      throw new BadRequestException(
        "Check-in date must be before check-out date and after today",
      );
    }

    return this.bookingModel.create({
      ...booking,
      status: BookingStatus.PENDING,
    });
  }

  async cancelBooking(bookingId: string) {
    const bookingToCancel = await this.bookingModel.findById(bookingId);

    if (!bookingToCancel) {
      throw new NotFoundException("Booking not found");
    }

    const checkInDate = dayjs(bookingToCancel.checkInDate);
    const today = dayjs();

    const isThreeDaysBeforeCheckIn = checkInDate.diff(today, "day");

    console.log(isThreeDaysBeforeCheckIn);
  }
}
