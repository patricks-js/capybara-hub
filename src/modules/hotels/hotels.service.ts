import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { UpdateHotelDto } from "./dto/update-hotel.dto";
import { Hotel } from "./entity/hotel.entity";

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private readonly hotelModel: Model<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto) {
    await this.hotelModel.create(createHotelDto);
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const hotels = await this.hotelModel.find().skip(skip).limit(limit).exec();

    const total = await this.hotelModel.countDocuments();

    return {
      data: hotels,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findByAddress(address: string) {
    return this.hotelModel.find({
      $or: [
        { "address.street": { $regex: address, $options: "i" } },
        { "address.city": { $regex: address, $options: "i" } },
        { "address.state": { $regex: address, $options: "i" } },
        { "address.country": { $regex: address, $options: "i" } },
      ],
    });
  }

  async findAllSorted(sortBy = "name", order: "asc" | "desc" = "asc") {
    return this.hotelModel.find().sort({ [sortBy]: order });
  }

  async findByName(name: string) {
    return this.hotelModel.find({
      name: { $regex: name, $options: "i" },
    });
  }

  async update(id: string, updateHotelDto: UpdateHotelDto) {
    return this.hotelModel.findByIdAndUpdate(
      id,
      { $set: updateHotelDto },
      { new: true },
    );
  }

  async findById(id: string) {
    return this.hotelModel.findOne({
      _id: id
    });
  }
}
