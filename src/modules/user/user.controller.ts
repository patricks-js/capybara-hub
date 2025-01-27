import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
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
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Controller("users")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: User,
  })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: User })
  async login(@Body() loginDto: LoginDto) {
    return this.userService.authenticate(loginDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: "Get All users successfully", type: [User] })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found users" })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ description: "Get user by id successfully", type: User })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found user" })
  @ApiBearerAuth()
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Put(":id")
  @ApiOkResponse({ description: "Update user successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found user" })
  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDto })
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  @ApiOkResponse({ description: "Delete user successfully" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiNotFoundResponse({ description: "Not found user" })
  @ApiBearerAuth()
  async remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
