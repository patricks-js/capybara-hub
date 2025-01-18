import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "dotenv";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { HotelModule } from './modules/hotel/hotel.module';
import { UserModule } from './modules/user/user.module';

config({
  path: ".env.local",
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    BookingsModule,
    RoomsModule,
    HotelModule,
    UserModule,
  ],
})
export class AppModule {}
