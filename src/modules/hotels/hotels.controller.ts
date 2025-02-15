import { PublicRoute } from "@/common/decorators/public-route";
import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { UpdateHotelDto } from "./dto/update-hotel.dto";
import { HotelsService } from "./hotels.service";

@ApiTags("hotels")
@Controller("hotels")
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new hotel" })
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @PublicRoute()
  @Get()
  @ApiOperation({ summary: "Get all hotels with pagination" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  findAll(@Query("page") page?: number, @Query("limit") limit?: number) {
    return this.hotelsService.findAll(page, limit);
  }

  @PublicRoute()
  @Get("search/address/:address")
  @ApiOperation({ summary: "Find hotels by address" })
  findByAddress(@Param("address") address: string) {
    return this.hotelsService.findByAddress(address);
  }

  @PublicRoute()
  @Get("sorted")
  @ApiOperation({ summary: "Get all hotels sorted" })
  @ApiQuery({ name: "sortBy", required: false })
  @ApiQuery({ name: "order", required: false, enum: ["asc", "desc"] })
  findAllSorted(
    @Query("sortBy") sortBy?: string,
    @Query("order") order?: "asc" | "desc",
  ) {
    return this.hotelsService.findAllSorted(sortBy, order);
  }

  @PublicRoute()
  @Get("search/name/:name")
  @ApiOperation({ summary: "Find hotels by name" })
  findByName(@Param("name") name: string) {
    return this.hotelsService.findByName(name);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a hotel" })
  update(@Param("id") id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(id, updateHotelDto);
  }
}
