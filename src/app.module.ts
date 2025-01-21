import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "dotenv";
import { ZodValidationPipe } from "nestjs-zod";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { HotelModule } from "./modules/hotel/hotel.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { UserModule } from "./modules/user/user.module";

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
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
