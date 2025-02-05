import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateRoomDTO } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from "./entities/room.entity";
import { RoomsService } from "./rooms.service";

@ApiTags("rooms")
@Controller("rooms")
@ApiBearerAuth()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Room,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiBody({ type: CreateRoomDTO })
  create(@Body() createRoomDTO: CreateRoomDTO) {
    return this.roomsService.create(createRoomDTO);
  }

  @Get()
  @ApiOkResponse({ description: "Get All rooms successfully", type: [Room] })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found rooms" })
  findAll() {}

  @Get(":id")
  @ApiOkResponse({ description: "Get rooms by id successfully", type: Room })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found rooms" })
  findOne(@Param("id") id: string) {}

  @Patch(":id")
  @ApiOkResponse({ description: "Update rooms successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found rooms" })
  @ApiBody({ type: [CreateRoomDTO] })
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {}

  @Delete(":id")
  @ApiOkResponse({ description: "Delete rooms successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found rooms" })
  remove(@Param("id") id: string) {}
}
