import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiCreatedResponse({description: 'The record has been successfully created.', type:Booking})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiBody({type: CreateBookingDto})
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Get All bookings successfully', type:[Booking]})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found bookings'})
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type:Booking,  description: 'Get booking by id successfully'})
  @ApiForbiddenResponse({  description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found bookings'})
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Update booking successfully'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found bookings'})
  @ApiBody({type: CreateBookingDto})
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete booking successfully'})
  @ApiForbiddenResponse({  description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found bookings'})
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
