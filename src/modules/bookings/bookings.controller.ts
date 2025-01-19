import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
// biome-ignore lint/style/useImportType: <explanation>
import { BookingsService } from './bookings.service';
// biome-ignore lint/style/useImportType: <explanation>
import { CreateBookingDto } from './dto/create-booking.dto';
// biome-ignore lint/style/useImportType: <explanation>
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@ApiTags('bookings')
@Controller('bookings')
@ApiBearerAuth()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiCreatedResponse({description: 'The record has been successfully created.'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiBody({type: CreateBookingDto})
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get All bookings successfully'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found bookings'})
  @ApiBody({type: [Booking]})
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get booking by id successfully'})
  @ApiForbiddenResponse({  description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found bookings'})
  @ApiBody({type: Booking})
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update booking successfully'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found bookings'})
  @ApiBody({type: UpdateBookingDto})
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete booking successfully'})
  @ApiForbiddenResponse({  description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found bookings'})
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
