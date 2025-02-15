import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsEnum, IsMongoId, IsPositive } from "class-validator";
import { RoomStatus } from "../entities/room.entity";

export class CreateRoomDto {
  @ApiProperty({ description: "Hotel ID" })
  @IsMongoId()
  readonly hotelId: string;

  @ApiProperty({ description: "Room type ID" })
  @IsMongoId()
  readonly roomTypeId: string;

  @ApiProperty({
    description: "Price per night for the room",
    example: "150.00",
  })
  @IsDecimal()
  readonly pricePerNight: string;

  @ApiProperty({
    description: "Room number in the hotel",
    example: 101,
  })
  @IsPositive()
  readonly roomNumber: number;

  @ApiProperty({
    description: "Current status of the room",
    enum: RoomStatus,
    example: RoomStatus.AVAILABLE,
  })
  @IsEnum(RoomStatus)
  readonly status: string;

  @ApiProperty({
    description: "Images of the room",
    example: ["image1.jpg", "image2.jpg"],
  })
  readonly images: string[];
}
