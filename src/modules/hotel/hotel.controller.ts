import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

import { Hotel } from './entities/hotel.entity';
import { HotelService } from './hotel.service';

@ApiTags('hotel')
@Controller('hotel')
@ApiBearerAuth()
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  @ApiCreatedResponse({description: 'The record has been successfully created.'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiBody({type: CreateHotelDto})
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get All hotel successfully'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found hotel'})
  @ApiBody({type: [Hotel]})
  findAll() {
    return this.hotelService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get hotel by id successfully'})
  @ApiForbiddenResponse({  description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found hotel'})
  @ApiBody({type: Hotel})
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update hotel successfully'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found hotel'})
  @ApiBody({type: UpdateHotelDto})
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(id, updateHotelDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete hotel successfully'})
  @ApiForbiddenResponse({  description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found hotel'})
  remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }
}
