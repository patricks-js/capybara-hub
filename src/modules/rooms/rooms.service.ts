import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateRoomDto } from "./dto/create-room.dto";
import { Room } from "./entities/room.entity";

/**
 * TODO: Implement filter to search by hotel and room type
 * TODO: Implement search all rooms with pagination
 * TODO: Implement sorting
 * TODO: Implement search by room number
 * TODO: Implement search by price per night
 * TODO: Implement search by status
 * TODO: Implement update room
 * TODO: Implement delete room
 */

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(createRoomDto: CreateRoomDto) {
    await this.roomModel.create({
      ...createRoomDto,
      hotel: createRoomDto.hotelId,
      roomType: createRoomDto.roomTypeId,
    });
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const rooms = await this.roomModel.find().skip(skip).limit(limit).exec();

    const total = await this.roomModel.countDocuments();

    return {
      data: rooms,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return await this.roomModel.findById(id).exec();
  }
}
