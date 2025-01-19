import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNumber, IsString } from "class-validator";
import { RoomType } from "../entities/room.entity";

export class CreateRoomDto {
  @IsMongoId()
  @ApiProperty()
  hotel_id: string;

  @IsEnum(RoomType)
  @ApiProperty()
  room_number: string;

  @IsString()
  @ApiProperty()
  room_type: string;

  @IsNumber()
  @ApiProperty()
  price_per_night: number;
}
