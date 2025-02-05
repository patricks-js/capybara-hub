import { PartialType } from "@nestjs/mapped-types";
import { CreateRoomDTO } from "./create-room.dto";

export class UpdateRoomDto extends PartialType(CreateRoomDTO) {}
