import { Body, Controller, Post } from "@nestjs/common";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { HotelsService } from "./hotels.service";

@Controller("hotels")
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }
}
