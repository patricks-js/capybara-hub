import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "dotenv";
import { LoggerModule } from "nestjs-pino";
import { ZodValidationPipe } from "nestjs-zod";
import { PinoLoggerService } from "./logging/pino-logger";
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
    LoggerModule.forRoot({
      pinoHttp:{
        transport:{
          target:"pino-pretty",
          options:{
            colorize: true,
            translateTime: "SYS:standard",
            ignore:"pid, hostname",
            singleLine: true,
          }
        }
      }
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
    {
      provide: "LOGGER_SERVICE",
      useClass: PinoLoggerService,
    }
  ],
})
export class AppModule {}
