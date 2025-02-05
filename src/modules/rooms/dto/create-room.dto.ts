import { IsDecimal, IsEnum, IsMongoId, IsPositive } from "class-validator";
import { roomStatuses } from "../entities/room.entity";

export class CreateRoomDto {
  @IsMongoId()
  hotelId: string;

  @IsMongoId()
  roomTypeId: string;

  @IsDecimal()
  pricePerNight: string;

  @IsPositive()
  roomNumber: number;

  @IsEnum(roomStatuses)
  status: string;
}
