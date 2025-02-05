import { Body, Controller, Post } from "@nestjs/common";
import { CreateHotelDTO } from "./dto/create-hotel.dto";
import { HotelsService } from "./hotels.service";

@Controller("hotels")
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelDTO: CreateHotelDTO) {
    return this.hotelsService.create(createHotelDTO);
  }
}
