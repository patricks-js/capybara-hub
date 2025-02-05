import { PartialType } from "@nestjs/mapped-types";
import { CreateHotelAddressDto } from "./create-hotel-address.dto";

export class UpdateHotelAddressDto extends PartialType(CreateHotelAddressDto) {}
