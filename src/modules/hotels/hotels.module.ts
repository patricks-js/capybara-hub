import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Hotel, HotelSchema } from "./entity/hotel.entity";
import { HotelsController } from "./hotels.controller";
import { HotelsService } from "./hotels.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
