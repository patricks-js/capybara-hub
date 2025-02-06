import { PartialType } from "@nestjs/swagger";
import { CreateHotelAddressDto } from "./create-hotel-address.dto";

export class UpdateHotelAddressDto extends PartialType(CreateHotelAddressDto) {}
