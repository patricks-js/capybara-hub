import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";

import { Room } from "./entities/room.entity";
import { RoomsService } from "./rooms.service";

@ApiTags('rooms')
@Controller("rooms")
@ApiBearerAuth()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiCreatedResponse({description: 'The record has been successfully created.'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiBody({type: CreateRoomDto})
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get All rooms successfully'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found rooms'})
  @ApiBody({type: [Room]})
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: 'Get rooms by id successfully'})
  @ApiForbiddenResponse({  description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found rooms'})
  @ApiBody({type: Room})
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, description: 'Update rooms successfully'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found rooms'})
  @ApiBody({type: [UpdateRoomDto]})
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(":id")
  @ApiResponse({ status: 200, description: 'Delete rooms successfully'})
  @ApiForbiddenResponse({  description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found rooms'})
  remove(@Param("id") id: string) {
    return this.roomsService.remove(id);
  }
}
