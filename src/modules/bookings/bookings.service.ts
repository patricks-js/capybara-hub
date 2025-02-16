import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
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
}
