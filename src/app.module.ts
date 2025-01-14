import { Module } from "@nestjs/common";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { RoomsModule } from "./modules/rooms/rooms.module";

@Module({
  imports: [BookingsModule, RoomsModule],
})
export class AppModule {}
