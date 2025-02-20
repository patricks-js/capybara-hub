import {
  Customer,
  CustomerSchema,
} from "@/modules/customers/entities/customer.entity";
import { Hotel, HotelSchema } from "@/modules/hotels/entity/hotel.entity";
import {
  RoomType,
  RoomTypeSchema,
} from "@/modules/rooms/entities/room-type.entity";
import { Room, RoomSchema } from "@/modules/rooms/entities/room.entity";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { SeederService } from "./seeder.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env.local",
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Hotel.name, schema: HotelSchema },
      { name: Room.name, schema: RoomSchema },
      { name: RoomType.name, schema: RoomTypeSchema },
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
