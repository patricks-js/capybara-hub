import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "dotenv";
import { LoggerModule } from "nestjs-pino";
import { AuthGuard } from "./common/guards/auth.guard";
import { PinoLoggerService } from "./logging/pino-logger";
import { AuthModule } from "./modules/auth/auth.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { CustomersModule } from "./modules/customers/customers.module";
import { HotelsModule } from "./modules/hotels/hotels.module";
import { RoomsModule } from "./modules/rooms/rooms.module";

config({
  path: ".env.local",
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid, hostname",
            singleLine: true,
          },
        },
      },
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    CustomersModule,
    HotelsModule,
    RoomsModule,
    BookingsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: "LOGGER_SERVICE",
      useClass: PinoLoggerService,
    },
  ],
})
export class AppModule {}
