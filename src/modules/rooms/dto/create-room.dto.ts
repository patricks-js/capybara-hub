/**
 *  "_id": "ObjectId",
    "hotel_id": "ObjectId",
    "room_type": "String (Single 1 bad,Double 2 bads,Triple 3 bads, Suite 1 bad for two peoples, Suite 1 bad for 2 peoples and a little kid)",
    "description": "String",
    "price_per_night": "Number",
    "amenities": ["String", "Example Wi-Fi", "Example Ar-condicionado"],
    "availability": "Boolean",
    "created_at": "Date",
    "updated_at": "Date"
 */

import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateRoomDto {
  hotelId: string;
  roomType: string;
  @IsNotEmpty()
  description: string;
  @IsPositive()
  pricePerNight: number;
  amenities: string[];
  availability: boolean;
}
