import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { Model } from "mongoose";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { Booking } from "./entities/booking.entity";

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
    return this.bookingModel.create(booking);
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
