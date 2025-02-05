import { IsDecimal, IsEnum, IsMongoId, IsPositive } from "class-validator";
import { RoomStatus } from "../entities/room.entity";

export class CreateRoomDto {
  @IsMongoId()
  hotelId: string;

  @IsMongoId()
  roomTypeId: string;

  @IsDecimal()
  pricePerNight: string;

  @IsPositive()
  roomNumber: number;

  @IsEnum(RoomStatus)
  status: string;
}
