import { PartialType } from "@nestjs/mapped-types";
import { CreateHotelAddressDTO } from "./create-hotel-address.dto";

export class UpdateHotelAddressDTO extends PartialType(CreateHotelAddressDTO) {}
