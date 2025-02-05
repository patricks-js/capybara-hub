import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateHotelDTO } from "./dto/create-hotel.dto";
import { Hotel } from "./entity/hotel.entity";

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private readonly hotelModel: Model<Hotel>,
  ) {}

  async create(createHotelDTO: CreateHotelDTO) {
    await this.hotelModel.create(createHotelDTO);
  }
}
