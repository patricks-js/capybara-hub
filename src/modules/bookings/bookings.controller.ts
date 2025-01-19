import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <explanation>
import { BookingsService } from './bookings.service';
// biome-ignore lint/style/useImportType: <explanation>
import { CreateBookingDto } from './dto/create-booking.dto';
// biome-ignore lint/style/useImportType: <explanation>
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
