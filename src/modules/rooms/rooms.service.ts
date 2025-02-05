import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateRoomDTO } from "./dto/create-room.dto";
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

  async create(createRoomDTO: CreateRoomDTO) {
    await this.roomModel.create({
      ...createRoomDTO,
      hotel: createRoomDTO.hotelId,
      roomType: createRoomDTO.roomTypeId,
    });
  }
}
