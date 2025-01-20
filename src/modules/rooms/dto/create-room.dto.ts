import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNumber, IsString } from "class-validator";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { RoomType } from "../entities/room.entity";

const schema = z.object({
  hotel_id: z.string().min(24),
  room_number: z.coerce.number(),
  room_type: z.nativeEnum(RoomType),
  price_per_night: z.number().positive(),
});

export class CreateRoomDto extends createZodDto(schema) {}

export class CreateRoomDto2 {
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
