import { PublicRoute } from "@/common/decorators/public-route";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from "./entities/room.entity";
import { RoomsService } from "./rooms.service";

@ApiTags("rooms")
@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Room,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiBody({ type: CreateRoomDto })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @PublicRoute()
  @Get()
  @ApiOkResponse({ description: "Get All rooms successfully", type: [Room] })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found rooms" })
  findAll(@Query("page") page?: number, @Query("limit") limit?: number) {
    return this.roomsService.findAll(page, limit);
  }

  @PublicRoute()
  @Get(":id")
  @ApiOkResponse({ description: "Get rooms by id successfully", type: Room })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found rooms" })
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ description: "Update rooms successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found rooms" })
  @ApiBody({ type: [CreateRoomDto] })
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {}

  @Delete(":id")
  @ApiOkResponse({ description: "Delete rooms successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found rooms" })
  remove(@Param("id") id: string) {}
}
