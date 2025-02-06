import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { Hotel } from "./entity/hotel.entity";

/**
 * TODO: Implement search all hotels with pagination
 * TODO: Implement search hotel by address
 * TODO: Implement sorting
 * TODO: Implement search by name
 * TODO: Implement update hotel
 */

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private readonly hotelModel: Model<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto) {
    await this.hotelModel.create(createHotelDto);
  }
}
