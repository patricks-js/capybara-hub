import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { UpdateHotelDto } from "./dto/update-hotel.dto";
import { Hotel } from "./entities/hotel.entity";

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) {}

  create(createHotelDto: CreateHotelDto) {
    return "This action adds a new hotel";
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} hotel`;
  }

  update(id: string, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: string) {
    return `This action removes a #${id} hotel`;
  }
}
