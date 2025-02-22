import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookingsModule } from "../bookings/bookings.module";
import { RoomType, RoomTypeSchema } from "./entities/room-type.entity";
import { Room, RoomSchema } from "./entities/room.entity";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: RoomType.name, schema: RoomTypeSchema },
    ]),
    BookingsModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
