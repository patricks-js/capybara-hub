import { IsEnum, IsMongoId, IsNumber, IsString } from "class-validator";
import { RoomType } from "../entities/room.entity";

export class CreateRoomDto {
  @IsMongoId()
  hotel_id: string;

  @IsEnum(RoomType)
  room_number: string;

  @IsString()
  room_type: string;

  @IsNumber()
  price_per_night: number;
}
